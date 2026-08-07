import { Test } from '@nestjs/testing';
import { PrismaSessionStore } from '../src/modules/auth/repositories/prisma-session.store';
import { PrismaService } from '../src/prisma/prisma.service';

describe('PrismaSessionStore', () => {
  let store: PrismaSessionStore;
  let prisma: {
    session: {
      create: jest.Mock;
      findFirst: jest.Mock;
      deleteMany: jest.Mock;
    };
  };

  const record = {
    tokenId: 'token-1',
    userId: 'user-1',
    tokenHash: 'abc123',
    device: 'iPhone',
    platform: 'ios',
    expiresAt: new Date(Date.now() + 60_000),
    createdAt: new Date(),
  };

  beforeEach(async () => {
    prisma = {
      session: {
        create: jest.fn().mockResolvedValue({}),
        findFirst: jest.fn().mockResolvedValue(null),
        deleteMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        PrismaSessionStore,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    store = moduleRef.get(PrismaSessionStore);
  });

  it('persists a session record with the session schema fields', async () => {
    await store.create(record);

    expect(prisma.session.create).toHaveBeenCalledWith({
      data: {
        userId: 'user-1',
        tokenHash: 'abc123',
        device: 'iPhone',
        platform: 'ios',
        expiresAt: record.expiresAt,
      },
    });
  });

  it('maps a stored session back to a refresh token record', async () => {
    prisma.session.findFirst.mockResolvedValue({
      id: 'session-1',
      userId: 'user-1',
      tokenHash: 'abc123',
      device: 'iPhone',
      platform: 'ios',
      expiresAt: record.expiresAt,
      createdAt: record.createdAt,
    });

    const result = await store.findByTokenHash('abc123');

    expect(prisma.session.findFirst).toHaveBeenCalledWith({
      where: {
        tokenHash: 'abc123',
        expiresAt: { gt: expect.any(Date) },
      },
    });
    expect(result).toEqual({
      tokenId: 'session-1',
      userId: 'user-1',
      tokenHash: 'abc123',
      device: 'iPhone',
      platform: 'ios',
      expiresAt: record.expiresAt,
      createdAt: record.createdAt,
    });
  });

  it('returns null when no session matches the token hash', async () => {
    prisma.session.findFirst.mockResolvedValue(null);
    await expect(store.findByTokenHash('unknown')).resolves.toBeNull();
  });

  it('revokes a single session by token hash', async () => {
    await store.revokeByTokenHash('abc123');
    expect(prisma.session.deleteMany).toHaveBeenCalledWith({
      where: { tokenHash: 'abc123' },
    });
  });

  it('revokes all sessions for a user', async () => {
    await store.revokeAllForUser('user-1');
    expect(prisma.session.deleteMany).toHaveBeenCalledWith({
      where: { userId: 'user-1' },
    });
  });
});