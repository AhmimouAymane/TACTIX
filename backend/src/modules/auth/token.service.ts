import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { randomBytes, createHash } from 'node:crypto';
import { UserEntity } from './entities/user.entity';
import { AuthTokenPairEntity } from './entities/auth-token-pair.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { RefreshTokenRecord } from './interfaces/refresh-token-record.interface';
import { REFRESH_TOKEN_STORE, RefreshTokenStore } from './interfaces/refresh-token-store.interface';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    @Inject(REFRESH_TOKEN_STORE) private readonly store: RefreshTokenStore,
  ) {}

  private getAccessTtl(): string {
    return this.config.get<string>('JWT_EXPIRES_IN') || '15m';
  }

  private getRefreshTtl(): string {
    return this.config.get<string>('JWT_REFRESH_EXPIRES_IN') || '30d';
  }

  private parseTtl(ttl: string): number {
    const match = ttl.match(/^(\d+)([smhd])$/);
    if (!match) return 0;
    const value = parseInt(match[1], 10);
    const unit = match[2];
    switch (unit) {
      case 's': return value * 1000;
      case 'm': return value * 60 * 1000;
      case 'h': return value * 60 * 60 * 1000;
      case 'd': return value * 24 * 60 * 60 * 1000;
      default: return 0;
    }
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  private generateJti(): string {
    return randomBytes(16).toString('hex');
  }

  async issueTokenPair(user: UserEntity): Promise<AuthTokenPairEntity> {
    const accessJti = this.generateJti();
    const refreshJti = this.generateJti();

    const accessPayload: JwtPayload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      type: 'access',
      jti: accessJti,
    };

    const refreshPayload: JwtPayload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      type: 'refresh',
      jti: refreshJti,
    };

    const accessSecret = this.config.getOrThrow<string>('JWT_SECRET');
    const refreshSecret = this.config.getOrThrow<string>('JWT_REFRESH_SECRET');
    const accessTtl = this.getAccessTtl();
    const refreshTtl = this.getRefreshTtl();

    const accessToken = await this.jwt.signAsync(accessPayload, {
      secret: accessSecret,
      expiresIn: accessTtl,
    } as Parameters<typeof this.jwt.signAsync>[1]);

    const refreshToken = await this.jwt.signAsync(refreshPayload, {
      secret: refreshSecret,
      expiresIn: refreshTtl,
    } as Parameters<typeof this.jwt.signAsync>[1]);

    const accessExpiresAt = new Date(Date.now() + this.parseTtl(accessTtl));
    const refreshExpiresAt = new Date(Date.now() + this.parseTtl(refreshTtl));

    await this.store.create({
      tokenId: refreshJti,
      userId: user.id,
      tokenHash: this.hashToken(refreshToken),
      expiresAt: refreshExpiresAt,
      createdAt: new Date(),
    });

    return new AuthTokenPairEntity(
      accessToken,
      refreshToken,
      accessExpiresAt.toISOString(),
      refreshExpiresAt.toISOString(),
    );
  }

  async findRefreshToken(token: string): Promise<RefreshTokenRecord | null> {
    const tokenHash = this.hashToken(token);
    return this.store.findByTokenHash(tokenHash);
  }

  async revokeRefreshToken(token: string): Promise<void> {
    const tokenHash = this.hashToken(token);
    await this.store.revokeByTokenHash(tokenHash);
  }

  async revokeAllForUser(userId: string): Promise<void> {
    await this.store.revokeAllForUser(userId);
  }
}