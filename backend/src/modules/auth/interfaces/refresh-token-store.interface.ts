import { RefreshTokenRecord } from './refresh-token-record.interface';

export const REFRESH_TOKEN_STORE = Symbol('REFRESH_TOKEN_STORE');

export interface RefreshTokenStore {
  create(record: RefreshTokenRecord): Promise<void>;
  findByTokenHash(tokenHash: string): Promise<RefreshTokenRecord | null>;
  revokeByTokenHash(tokenHash: string): Promise<void>;
  revokeAllForUser(userId: string): Promise<void>;
}
