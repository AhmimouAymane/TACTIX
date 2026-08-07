export interface RefreshTokenRecord {
  tokenId: string;
  userId: string;
  tokenHash: string;
  device?: string;
  platform?: string;
  ipAddress?: string;
  expiresAt: Date;
  createdAt: Date;
}
