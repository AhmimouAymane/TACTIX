import { Test } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenService } from '../src/modules/auth/token.service';
import { InMemoryRefreshTokenStore } from '../src/modules/auth/repositories/in-memory-refresh-token.store';
import { REFRESH_TOKEN_STORE } from '../src/modules/auth/interfaces/refresh-token-store.interface';
import { UserEntity, UserRole } from '../src/modules/auth/entities/user.entity';

describe('TokenService', () => {
  let service: TokenService;

  const mockUser = new UserEntity({
    id: 'user-123',
    email: 'test@tactix.ma',
    username: 'testuser',
    displayName: 'Test User',
    passwordHash: 'hash',
    role: 'USER' as UserRole,
    status: 'ACTIVE',
    mfaEnabled: false,
    mfaSecret: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'test-secret',
          signOptions: { expiresIn: '15m' },
        }),
      ],
      providers: [
        TokenService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              const values: Record<string, string> = {
                JWT_SECRET: 'test-access-secret',
                JWT_REFRESH_SECRET: 'test-refresh-secret',
                JWT_EXPIRES_IN: '15m',
                JWT_REFRESH_EXPIRES_IN: '30d',
              };
              return values[key];
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
        { provide: REFRESH_TOKEN_STORE, useClass: InMemoryRefreshTokenStore },
      ],
    }).compile();

    service = moduleRef.get(TokenService);
  });

  it('issues an access/refresh token pair', async () => {
    const tokens = await service.issueTokenPair(mockUser);
    expect(tokens.access_token).toBeTruthy();
    expect(tokens.refresh_token).toBeTruthy();
    expect(tokens.token_type).toBe('Bearer');
    expect(tokens.access_token_expires_at).toBeTruthy();
    expect(tokens.refresh_token_expires_at).toBeTruthy();
  });

  it('stores refresh token hash and can find it', async () => {
    const tokens = await service.issueTokenPair(mockUser);
    const record = await service.findRefreshToken(tokens.refresh_token);
    expect(record).not.toBeNull();
    expect(record?.userId).toBe(mockUser.id);
  });

  it('revokes a refresh token', async () => {
    const tokens = await service.issueTokenPair(mockUser);
    await service.revokeRefreshToken(tokens.refresh_token);
    const record = await service.findRefreshToken(tokens.refresh_token);
    expect(record).toBeNull();
  });

  it('revokes all refresh tokens for a user', async () => {
    const tokens1 = await service.issueTokenPair(mockUser);
    const tokens2 = await service.issueTokenPair(mockUser);
    await service.revokeAllForUser(mockUser.id);
    expect(await service.findRefreshToken(tokens1.refresh_token)).toBeNull();
    expect(await service.findRefreshToken(tokens2.refresh_token)).toBeNull();
  });
});