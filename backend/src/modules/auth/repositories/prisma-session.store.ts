import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { RefreshTokenRecord } from '../interfaces/refresh-token-record.interface';
import { RefreshTokenStore } from '../interfaces/refresh-token-store.interface';

@Injectable()
export class PrismaSessionStore implements RefreshTokenStore {
  constructor(private readonly prisma: PrismaService) {}

  async create(record: RefreshTokenRecord): Promise<void> {
    await this.prisma.session.create({
      data: {
        userId: record.userId,
        tokenHash: record.tokenHash,
        device: record.device ?? null,
        platform: record.platform ?? null,
        expiresAt: record.expiresAt,
      },
    });
  }

  async findByTokenHash(tokenHash: string): Promise<RefreshTokenRecord | null> {
    const session = await this.prisma.session.findFirst({
      where: {
        tokenHash,
        expiresAt: { gt: new Date() },
      },
    });
    if (!session) return null;

    return {
      tokenId: session.id,
      userId: session.userId,
      tokenHash: session.tokenHash,
      device: session.device ?? undefined,
      platform: session.platform ?? undefined,
      expiresAt: session.expiresAt,
      createdAt: session.createdAt,
    };
  }

  async revokeByTokenHash(tokenHash: string): Promise<void> {
    await this.prisma.session.deleteMany({ where: { tokenHash } });
  }

  async revokeAllForUser(userId: string): Promise<void> {
    await this.prisma.session.deleteMany({ where: { userId } });
  }
}