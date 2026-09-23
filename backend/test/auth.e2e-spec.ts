import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { generate } from 'otplib';
import { AppModule } from '../src/app.module';
import { HttpExceptionFilter } from '../src/common/filters/http-exception.filter';
import { InMemoryRefreshTokenStore } from '../src/modules/auth/repositories/in-memory-refresh-token.store';
import { REFRESH_TOKEN_STORE } from '../src/modules/auth/interfaces/refresh-token-store.interface';

// Set required environment variables for testing
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-access-secret';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';
process.env.JWT_EXPIRES_IN = '15m';
process.env.JWT_REFRESH_EXPIRES_IN = '30d';
process.env.BCRYPT_ROUNDS = '10';
process.env.CORS_ORIGIN = 'http://localhost:3000';
process.env.API_PREFIX = 'api/v1';
process.env.PORT = '3000';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  const run = Date.now().toString(36);
  const user = {
    email: `player.${run}@tactix.ma`,
    username: `player1.${run}`,
    password: 'SuperSecret1',
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(REFRESH_TOKEN_STORE)
      .useClass(InMemoryRefreshTokenStore)
      .compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('registers and accesses a guarded endpoint', async () => {
    const register = await request(app.getHttpServer())
      .post('/api/v1/auth/register')
      .send({ ...user })
      .expect(201);

    expect(register.body.tokens.access_token).toBeTruthy();
    expect(register.body.tokens.refresh_token).toBeTruthy();

    const session = await request(app.getHttpServer())
      .get('/api/v1/auth/session')
      .set('Authorization', `Bearer ${register.body.tokens.access_token}`)
      .expect(200);

    expect(session.body.email).toBe(user.email);

    await request(app.getHttpServer())
      .get('/api/v1/auth/session')
      .expect(401)
      .expect((res) => expect(res.body.error.code).toBe('UNAUTHORIZED'));
  });

  it('validates request bodies with the documented error shape', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/auth/register')
      .send({ email: 'not-an-email', username: 'x', password: 'short' })
      .expect(400);

    expect(res.body.error.code).toBe('VALIDATION_ERROR');
    expect(res.body.error.message).toBeTruthy();
  });

  it('logs in, rotates refresh tokens, and logs out', async () => {
    const secondUser = { ...user, email: `player2.${run}@tactix.ma`, username: `player2.${run}` };
    await request(app.getHttpServer()).post('/api/v1/auth/register').send(secondUser).expect(201);

    const login = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ email: secondUser.email, password: secondUser.password })
      .expect(200);

    const firstRefresh = login.body.tokens.refresh_token;

    const rotated = await request(app.getHttpServer())
      .post('/api/v1/auth/refresh')
      .send({ refresh_token: firstRefresh })
      .expect(200);

    expect(rotated.body.tokens.refresh_token).not.toBe(firstRefresh);

    await request(app.getHttpServer())
      .post('/api/v1/auth/refresh')
      .send({ refresh_token: firstRefresh })
      .expect(401)
      .expect((res) => expect(res.body.error.code).toBe('UNAUTHORIZED'));

    const logout = await request(app.getHttpServer())
      .post('/api/v1/auth/logout')
      .set('Authorization', `Bearer ${rotated.body.tokens.access_token}`)
      .expect(200);

    expect(logout.body.message).toBe('Logged out successfully');

    await request(app.getHttpServer())
      .post('/api/v1/auth/refresh')
      .send({ refresh_token: rotated.body.tokens.refresh_token })
      .expect(401);
  });

  it('change password revokes existing sessions', async () => {
    const thirdUser = { ...user, email: `player3.${run}@tactix.ma`, username: `player3.${run}` };
    await request(app.getHttpServer()).post('/api/v1/auth/register').send(thirdUser).expect(201);

    const login = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ email: thirdUser.email, password: thirdUser.password })
      .expect(200);

    const accessToken = login.body.tokens.access_token;
    const refreshToken = login.body.tokens.refresh_token;

    await request(app.getHttpServer())
      .post('/api/v1/auth/change-password')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ current_password: thirdUser.password, new_password: 'NewPass123!' })
      .expect(200);

    await request(app.getHttpServer())
      .post('/api/v1/auth/refresh')
      .send({ refresh_token: refreshToken })
      .expect(401);

    await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ email: thirdUser.email, password: 'NewPass123!' })
      .expect(200);
  });

  it('enables MFA and completes login with a TOTP code', async () => {
    const mfaUser = { ...user, email: `mfa.${run}@tactix.ma`, username: `mfaplayer.${run}` };
    const register = await request(app.getHttpServer())
      .post('/api/v1/auth/register')
      .send(mfaUser)
      .expect(201);

    const enrollment = await request(app.getHttpServer())
      .post('/api/v1/auth/mfa/enroll')
      .set('Authorization', `Bearer ${register.body.tokens.access_token}`)
      .expect(200);

    expect(enrollment.body.secret).toBeTruthy();
    expect(enrollment.body.otpauth_url).toContain('otpauth://totp/TACTIX');
    expect(enrollment.body.qr_code_data_url).toBeTruthy();

    const code = await generate({ secret: enrollment.body.secret });

    await request(app.getHttpServer())
      .post('/api/v1/auth/mfa/confirm')
      .set('Authorization', `Bearer ${register.body.tokens.access_token}`)
      .send({ secret: enrollment.body.secret, code })
      .expect(200);

    const login = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ email: mfaUser.email, password: mfaUser.password })
      .expect(200);

    expect(login.body.requires_mfa).toBe(true);
    expect(login.body.tokens).toBeUndefined();

    const verified = await request(app.getHttpServer())
      .post('/api/v1/auth/mfa/verify')
      .send({ email: mfaUser.email, code })
      .expect(200);

    expect(verified.body.tokens.access_token).toBeTruthy();
    expect(verified.body.tokens.refresh_token).toBeTruthy();

    const rotated = await request(app.getHttpServer())
      .post('/api/v1/auth/refresh')
      .send({ refresh_token: verified.body.tokens.refresh_token })
      .expect(200);

    expect(rotated.body.tokens.refresh_token).not.toBe(verified.body.tokens.refresh_token);

    await request(app.getHttpServer())
      .post('/api/v1/auth/mfa/verify')
      .send({ email: mfaUser.email, code: '000000' })
      .expect(401)
      .expect((res) => expect(res.body.error.code).toBe('MFA_INVALID_CODE'));
  });
});