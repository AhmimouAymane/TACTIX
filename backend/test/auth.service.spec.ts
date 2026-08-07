import { Test } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { HttpStatus } from '@nestjs/common';
import { AuthService } from '../src/modules/auth/auth.service';
import { PasswordService } from '../src/modules/auth/password.service';
import { TokenService } from '../src/modules/auth/token.service';
import { MfaService } from '../src/modules/auth/mfa.service';
import { InMemoryUserRepository } from '../src/modules/auth/repositories/in-memory-user.repository';
import { InMemoryRefreshTokenStore } from '../src/modules/auth/repositories/in-memory-refresh-token.store';
import { USER_REPOSITORY } from '../src/modules/auth/interfaces/user-repository.interface';
import { REFRESH_TOKEN_STORE } from '../src/modules/auth/interfaces/refresh-token-store.interface';
import { AuthenticatedUserEntity } from '../src/modules/auth/entities/authenticated-user.entity';

jest.mock('otplib', () => ({
  generateSecret: jest.fn(() => 'JBSWY3DPEHPK3PXP'),
  generateURI: jest.fn(({ issuer, label, secret }: { issuer: string; label: string; secret: string }) =>
    `otpauth://totp/${issuer}:${label}?secret=${secret}`,
  ),
  verify: jest.fn(async ({ token }: { token: string }) => ({ valid: token === '123456' })),
}));

describe('AuthService', () => {
  let service: AuthService;

  const registerDto = {
    email: 'player@tactix.ma',
    username: 'player1',
    password: 'SuperSecret1',
    display_name: 'Player One',
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [JwtModule.register({})],
      providers: [
        AuthService,
        PasswordService,
        TokenService,
        MfaService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string, fallback?: unknown) => {
              const values: Record<string, string | number> = {
                JWT_ACCESS_SECRET: 'test-access-secret',
                JWT_REFRESH_SECRET: 'test-refresh-secret',
                JWT_ACCESS_TTL: '15m',
                JWT_REFRESH_TTL: '30d',
                BCRYPT_ROUNDS: 4,
              };
              return values[key] ?? fallback;
            }),
            getOrThrow: jest.fn((key: string) => {
              const values: Record<string, string> = {
                JWT_SECRET: 'test-access-secret',
                JWT_REFRESH_SECRET: 'test-refresh-secret',
              };
              return values[key];
            }),
          },
        },
        { provide: USER_REPOSITORY, useClass: InMemoryUserRepository },
        { provide: REFRESH_TOKEN_STORE, useClass: InMemoryRefreshTokenStore },
      ],
    }).compile();

    service = moduleRef.get(AuthService);
  });

  it('registers a user and returns a token pair', async () => {
    const result = await service.register(registerDto);
    expect(result.user.email).toBe('player@tactix.ma');
    expect(result.user).not.toHaveProperty('passwordHash');
    expect(result.tokens.access_token).toBeTruthy();
    expect(result.tokens.refresh_token).toBeTruthy();
  });

  it('rejects duplicate registration', async () => {
    await service.register(registerDto);
    await expect(service.register(registerDto)).rejects.toMatchObject({
      code: 'DUPLICATE_ENTRY',
      status: HttpStatus.CONFLICT,
    });
  });

  it('logs in with valid credentials', async () => {
    await service.register(registerDto);
    const result = await service.login({ email: registerDto.email, password: registerDto.password });
    expect(result.requires_mfa).toBe(false);
    expect(result.tokens?.access_token).toBeTruthy();
  });

  it('rejects invalid credentials with a generic error', async () => {
    await service.register(registerDto);
    await expect(
      service.login({ email: registerDto.email, password: 'wrong-password' }),
    ).rejects.toMatchObject({ code: 'UNAUTHORIZED', status: HttpStatus.UNAUTHORIZED });
  });

  it('rotates refresh tokens: old token becomes invalid after use', async () => {
    const { tokens } = await service.register(registerDto);
    const login = await service.login(registerDto);
    const userId = login.user.id;
    const identity = new AuthenticatedUserEntity(userId, registerDto.email, registerDto.username, 'USER', 'jti');

    const rotated = await service.refresh(identity, tokens.refresh_token);
    expect(rotated.tokens.refresh_token).not.toBe(tokens.refresh_token);

    await expect(service.refresh(identity, tokens.refresh_token)).rejects.toMatchObject({
      code: 'UNAUTHORIZED',
      status: HttpStatus.UNAUTHORIZED,
    });
  });

  it('logout revokes all refresh tokens for the user', async () => {
    const userId = (await service.register(registerDto)).user.id;
    const identity = new AuthenticatedUserEntity(userId, registerDto.email, registerDto.username, 'USER');
    const login = await service.login(registerDto);
    const refreshToken = login.tokens?.refresh_token as string;

    await service.logout(identity);
    await expect(service.refresh(identity, refreshToken)).rejects.toMatchObject({
      code: 'UNAUTHORIZED',
      status: HttpStatus.UNAUTHORIZED,
    });
  });

  it('changes the password and revokes sessions', async () => {
    const userId = (await service.register(registerDto)).user.id;
    const identity = new AuthenticatedUserEntity(userId, registerDto.email, registerDto.username, 'USER');

    await service.changePassword(identity, {
      current_password: registerDto.password,
      new_password: 'NewSuperSecret1',
    });

    await expect(
      service.login({ email: registerDto.email, password: registerDto.password }),
    ).rejects.toMatchObject({ code: 'UNAUTHORIZED' });

    await expect(
      service.login({ email: registerDto.email, password: 'NewSuperSecret1' }),
    ).resolves.toMatchObject({ requires_mfa: false });
  });

  it('rejects password change with wrong current password', async () => {
    const userId = (await service.register(registerDto)).user.id;
    const identity = new AuthenticatedUserEntity(userId, registerDto.email, registerDto.username, 'USER');

    await expect(
      service.changePassword(identity, {
        current_password: 'wrong',
        new_password: 'NewSuperSecret1',
      }),
    ).rejects.toMatchObject({ code: 'UNAUTHORIZED', status: HttpStatus.UNAUTHORIZED });
  });

  describe('MFA flows', () => {
    const secret = 'JBSWY3DPEHPK3PXP';
    const code = '123456';

    it('enrolls and confirms MFA with a TOTP code', async () => {
      const userId = (await service.register(registerDto)).user.id;
      const identity = new AuthenticatedUserEntity(userId, registerDto.email, registerDto.username, 'USER');

      const enrollment = await service.mfaEnroll(identity);
      expect(enrollment.secret).toBe(secret);
      expect(enrollment.otpauth_url).toContain('otpauth://totp/TACTIX');
      expect(enrollment.qr_code_data_url).toBeTruthy();

      await expect(
        service.mfaConfirm(identity, { secret, code: '000000' }),
      ).rejects.toMatchObject({ code: 'MFA_INVALID_CODE', status: HttpStatus.UNAUTHORIZED });

      await service.mfaConfirm(identity, { secret, code });

      const user = await service['userRepository'].findById(userId);
      expect(user?.mfaEnabled).toBe(true);
      expect(user?.mfaSecret).toBe(secret);
    });

    it('rejects MFA confirmation with an invalid code', async () => {
      const userId = (await service.register(registerDto)).user.id;
      const identity = new AuthenticatedUserEntity(userId, registerDto.email, registerDto.username, 'USER');

      await expect(
        service.mfaConfirm(identity, { secret, code: '000000' }),
      ).rejects.toMatchObject({ code: 'MFA_INVALID_CODE', status: HttpStatus.UNAUTHORIZED });
    });

    it('rejects MFA confirmation for non-existent user', async () => {
      const identity = new AuthenticatedUserEntity('non-existent', 'test@test.com', 'test', 'USER');
      await expect(
        service.mfaConfirm(identity, { secret, code }),
      ).rejects.toMatchObject({ code: 'NOT_FOUND', status: HttpStatus.NOT_FOUND });
    });
  });
});