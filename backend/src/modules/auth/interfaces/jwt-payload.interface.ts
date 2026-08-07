import { UserRole } from '../entities/user.entity';

export interface JwtPayload {
  sub: string;
  email: string;
  username: string;
  role: UserRole;
  type: 'access' | 'refresh';
  jti?: string;
  iat?: number;
  exp?: number;
}
