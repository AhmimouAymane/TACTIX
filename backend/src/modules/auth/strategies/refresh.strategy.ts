import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { AuthenticatedUserEntity } from '../entities/authenticated-user.entity';
import { TokenService } from '../token.service';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    configService: ConfigService,
    private readonly token: TokenService,
  ) {
    super({
      jwtFromRequest: (req: { body?: { refresh_token?: string } }) =>
        req?.body?.refresh_token ?? null,
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(
    req: { body?: { refresh_token?: string } },
    payload: JwtPayload,
  ): Promise<AuthenticatedUserEntity> {
    const refreshToken = req?.body?.refresh_token;
    if (!refreshToken) {
      throw new UnauthorizedException('Missing refresh token');
    }

    const record = await this.token.findRefreshToken(refreshToken);
    if (!record || record.userId !== payload.sub) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    return new AuthenticatedUserEntity(
      payload.sub,
      payload.email,
      payload.username,
      payload.role,
      record.tokenId,
    );
  }
}