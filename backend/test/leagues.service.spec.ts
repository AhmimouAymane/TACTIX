import { LeaguesService } from '../src/modules/leagues/leagues.service';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';

describe('LeaguesService', () => {
  const league = {
    id: 'l1',
    name: 'Champions',
    code: 'ABC12345',
    ownerId: 'u1',
    capacity: 10,
    members: [{ userId: 'u1', role: 'OWNER', joinedAt: new Date() }],
  };

  const prismaMock = {
    league: { findUnique: jest.fn(), create: jest.fn() },
    leagueMember: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      count: jest.fn(),
      create: jest.fn(),
      deleteMany: jest.fn(),
    },
    leagueInvitation: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    user: { findUnique: jest.fn() },
    competition: { findFirst: jest.fn() },
    $transaction: jest.fn(),
  };

  let service: LeaguesService;

  beforeEach(() => {
    jest.clearAllMocks();
    prismaMock.league.findUnique.mockResolvedValue({
      ...league,
      members: [
        { userId: 'u1', role: 'OWNER', joinedAt: new Date() },
        { userId: 'u2', role: 'MEMBER', joinedAt: new Date() },
      ],
    });
    prismaMock.leagueMember.findUnique.mockResolvedValue(null);
    prismaMock.leagueMember.count.mockResolvedValue(1);
    prismaMock.league.create.mockResolvedValue(league);
    prismaMock.leagueInvitation.findUnique.mockResolvedValue(null);
    prismaMock.leagueInvitation.create.mockResolvedValue({
      id: 'i1',
      token: 'tok-1',
      expiresAt: new Date(),
    });
    prismaMock.user.findUnique.mockResolvedValue({ id: 'u2' });
    prismaMock.competition.findFirst.mockResolvedValue({ id: 'comp1' });
    prismaMock.$transaction.mockImplementation((arg) =>
      typeof arg === 'function' ? arg(prismaMock) : Promise.all(arg),
    );
    service = new LeaguesService(prismaMock as never);
  });

  describe('createLeague', () => {
    it('creates a league with a generated code and the owner as member', async () => {
      prismaMock.league.findUnique.mockResolvedValue(null);

      const result = await service.createLeague('u1', { name: 'Champions' });

      expect(prismaMock.leagueMember.create).toHaveBeenCalledWith({
        data: { leagueId: 'l1', userId: 'u1', role: 'OWNER' },
      });
      expect(result.code).toMatch(/^[A-Z0-9]{8}$/);
    });

    it('regenerates the code when it collides', async () => {
      prismaMock.league.findUnique
        .mockResolvedValueOnce(league)
        .mockResolvedValueOnce(null);

      await service.createLeague('u1', { name: 'Champions' });

      expect(prismaMock.league.findUnique).toHaveBeenCalledTimes(2);
    });
  });

  describe('joinLeague', () => {
    it('joins by code (case insensitive)', async () => {
      const result = await service.joinLeague('u2', { code: 'abc12345' });

      expect(prismaMock.leagueMember.create).toHaveBeenCalledWith({
        data: { leagueId: 'l1', userId: 'u2' },
      });
      expect(result.id).toBe('l1');
    });

    it('rejects an unknown code', async () => {
      prismaMock.league.findUnique.mockResolvedValue(null);
      await expect(
        service.joinLeague('u2', { code: 'ZZZZZZZZ' }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('rejects a duplicate membership', async () => {
      prismaMock.leagueMember.findUnique.mockResolvedValue({ userId: 'u2' });
      await expect(
        service.joinLeague('u2', { code: 'ABC12345' }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects when the league is full', async () => {
      prismaMock.leagueMember.count.mockResolvedValue(10);
      await expect(
        service.joinLeague('u2', { code: 'ABC12345' }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('leaveLeague', () => {
    it('blocks the owner from leaving', async () => {
      await expect(service.leaveLeague('u1', 'l1')).rejects.toBeInstanceOf(
        BadRequestException,
      );
    });

    it('removes the membership for a regular member', async () => {
      const result = await service.leaveLeague('u2', 'l1');
      expect(prismaMock.leagueMember.deleteMany).toHaveBeenCalledWith({
        where: { leagueId: 'l1', userId: 'u2' },
      });
      expect(result).toEqual({ left: true });
    });
  });

  describe('getStandings', () => {
    it('orders members by total points with ranks', async () => {
      prismaMock.leagueMember.findMany.mockResolvedValue([
        {
          user: {
            id: 'u1',
            displayName: 'Ali',
            username: 'ali',
            fantasyTeams: [{ name: 'Lions', totalPoints: 10 }],
          },
        },
        {
          user: {
            id: 'u2',
            displayName: null,
            username: 'bob',
            fantasyTeams: [{ name: 'Bob FC', totalPoints: 45 }],
          },
        },
        {
          user: {
            id: 'u3',
            displayName: 'Cam',
            username: 'cam',
            fantasyTeams: [],
          },
        },
      ]);

      const result = await service.getStandings('u1', 'l1');

      expect(result.standings).toEqual([
        { userId: 'u2', displayName: 'bob', teamName: 'Bob FC', totalPoints: 45, hasTeam: true, rank: 1 },
        { userId: 'u1', displayName: 'Ali', teamName: 'Lions', totalPoints: 10, hasTeam: true, rank: 2 },
        { userId: 'u3', displayName: 'Cam', teamName: null, totalPoints: 0, hasTeam: false, rank: 3 },
      ]);
    });
  });

  describe('invitations', () => {
    const invitation = {
      id: 'i1',
      leagueId: 'l1',
      userId: 'u2',
      token: 'tok-1',
      status: 'PENDING',
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      league: league,
    };

    it('creates an invitation token for the owner only', async () => {
      const result = await service.createInvitation('u1', 'l1', 'u2');
      expect(result.token).toBeDefined();
      expect(prismaMock.leagueInvitation.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ leagueId: 'l1', userId: 'u2' }),
      });
    });

    it('forbids non-owners from inviting', async () => {
      await expect(
        service.createInvitation('u2', 'l1', 'u2'),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('rejects an invitation for a user already in the league', async () => {
      prismaMock.leagueMember.findUnique.mockResolvedValue({ userId: 'u2' });
      await expect(
        service.createInvitation('u1', 'l1', 'u2'),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('accepts a pending invitation and joins the league', async () => {
      prismaMock.leagueInvitation.findUnique.mockResolvedValue(invitation);

      const result = await service.acceptInvitation('u2', {
        invitationId: 'i1',
      });

      expect(prismaMock.leagueMember.create).toHaveBeenCalledWith({
        data: { leagueId: 'l1', userId: 'u2' },
      });
      expect(prismaMock.leagueInvitation.update).toHaveBeenCalledWith({
        where: { id: 'i1' },
        data: { status: 'ACCEPTED' },
      });
      expect(result.id).toBe('l1');
    });

    it('rejects an expired invitation', async () => {
      prismaMock.leagueInvitation.findUnique.mockResolvedValue({
        ...invitation,
        expiresAt: new Date(Date.now() - 1000),
      });
      await expect(
        service.acceptInvitation('u2', { invitationId: 'i1' }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects an invitation for another user', async () => {
      prismaMock.leagueInvitation.findUnique.mockResolvedValue(invitation);
      await expect(
        service.acceptInvitation('u3', { invitationId: 'i1' }),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });
  });
});