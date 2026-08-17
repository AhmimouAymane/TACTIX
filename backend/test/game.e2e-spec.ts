import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { HttpExceptionFilter } from '../src/common/filters/http-exception.filter';

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-access-secret';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';
process.env.JWT_EXPIRES_IN = '15m';
process.env.JWT_REFRESH_EXPIRES_IN = '30d';
process.env.BCRYPT_ROUNDS = '10';
process.env.CORS_ORIGIN = 'http://localhost:3000';
process.env.API_PREFIX = 'api/v1';
process.env.PORT = '3000';

describe('Game (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

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

  it('lists seeded clubs', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/clubs')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).toHaveProperty('shortName');
  });

  it('lists players with pagination and filters', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/players?position=FWD&limit=5')
      .expect(200);

    expect(res.body).toHaveProperty('items');
    expect(res.body).toHaveProperty('total');
    expect(res.body.total).toBeGreaterThanOrEqual(1);
    expect(res.body.limit).toBe(5);
    expect(res.body.items.every((p: { position: string }) => p.position === 'FWD')).toBe(true);
  });

  it('returns the current gameweek with its fixtures', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/gameweeks/current')
      .expect(200);

    expect(res.body).toHaveProperty('number');
    expect(res.body).toHaveProperty('status');
    expect(Array.isArray(res.body.fixtures)).toBe(true);
  });

  it('lists fixtures', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/fixtures')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    expect(res.body[0]).toHaveProperty('homeClub');
    expect(res.body[0]).toHaveProperty('awayClub');
  });

  it('computes fantasy points', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/scoring/compute')
      .send({
        position: 'MID',
        appeared: true,
        goals: 1,
        assists: 1,
        cleanSheet: true,
      })
      .expect(201);

    expect(res.body.points).toBe(11);
  });

  it('rejects gameweek processing without authentication', async () => {
    const gameweeks = await request(app.getHttpServer())
      .get('/api/v1/gameweeks')
      .expect(200);

    const gameweekId = gameweeks.body[0].id as string;

    await request(app.getHttpServer())
      .post(`/api/v1/gameweeks/${gameweekId}/process`)
      .expect(401)
      .expect((res) => expect(res.body.error.code).toBe('UNAUTHORIZED'));
  });

  it('requires a valid gameweek and finished fixtures to process', async () => {
    const register = await request(app.getHttpServer())
      .post('/api/v1/auth/register')
      .send({
        email: 'gamer@tactix.ma',
        username: 'gamer1',
        password: 'SuperSecret1',
      })
      .expect(201);

    const token = register.body.tokens.access_token as string;
    const gameweeks = await request(app.getHttpServer())
      .get('/api/v1/gameweeks')
      .expect(200);

    const gameweekId = gameweeks.body[0].id as string;

    const res = await request(app.getHttpServer())
      .post(`/api/v1/gameweeks/${gameweekId}/process`)
      .set('Authorization', `Bearer ${token}`)
      .expect(400);

    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });
});