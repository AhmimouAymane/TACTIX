import { Injectable } from '@nestjs/common';
import { RefreshTokenRecord } from '../interfaces/refresh-token-record.interface';
import { RefreshTokenStore } from '../interfaces/refresh-token-store.interface';

@Injectable()
export class InMemoryRefreshTokenStore implements RefreshTokenStore {
  private readonly records = new Map<string, RefreshTokenRecord>();
  private readonly byUser = new Map<string, Set<string>>();

  async create(record: RefreshTokenRecord): Promise<void> {
    this.records.set(record.tokenHash, record);
    const userTokens = this.byUser.get(record.userId) ?? new Set<string>();
    userTokens.add(record.tokenHash);
    this.byUser.set(record.userId, userTokens);
  }

  async findByTokenHash(tokenHash: string): Promise<RefreshTokenRecord | null> {
    const record = this.records.get(tokenHash);
    if (!record) return null;
    if (record.expiresAt.getTime() <= Date.now()) {
      await this.revokeByTokenHash(tokenHash);
      return null;
    }
    return record;
  }

  async revokeByTokenHash(tokenHash: string): Promise<void> {
    const record = this.records.get(tokenHash);
    if (!record) return;
    this.records.delete(tokenHash);
    const userTokens = this.byUser.get(record.userId);
    userTokens?.delete(tokenHash);
    if (userTokens && userTokens.size === 0) this.byUser.delete(record.userId);
  }

  async revokeAllForUser(userId: string): Promise<void> {
    const userTokens = this.byUser.get(userId);
    if (!userTokens) return;
    for (const hash of userTokens) {
      this.records.delete(hash);
    }
    this.byUser.delete(userId);
  }
}
