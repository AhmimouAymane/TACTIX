import { TeamsService } from '../src/modules/teams/teams.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateSquadSlotDto } from '../src/modules/teams/dto/teams.dto';

describe('TeamsService', () => {
  const competition = { id: 'comp1' };
  const team = {
    id: 't1',
    userId: 'u1',
    seasonId: 'comp1',
    name: 'Atlas Lions',
    value: 0,
    budgetRemaining: 100,
    totalPoints: 0,
    squadSlots: [],
  };

  const players = [
    { id: 'p1', position: 'GK', currentPrice: 5, lastName: 'Bono' },
    { id: 'p2', position: 'DEF', currentPrice: 4, lastName: 'Aguerd' },
    { id: 'p3', position: 'MID', currentPrice: 9, lastName: 'Amrabat' },
    { id: 'p4', position: 'FWD', currentPrice: 11, lastName: 'En-Nesyri' },
    { id: 'p5', position: 'FWD', currentPrice: 10, lastName: 'El Kaabi' },
  ];

  const prismaMock = {
    competition: { findFirst: jest.fn() },
    fantasyTeam: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    player: { findMany: jest.fn() },
    squadSlot: { deleteMany: jest.fn(), createMany: jest.fn() },
    $transaction: jest.fn(),
  };

  let service: TeamsService;

  beforeEach(() => {
    jest.clearAllMocks();
    prismaMock.competition.findFirst.mockResolvedValue(competition);
    prismaMock.fantasyTeam.findUnique.mockResolvedValue(team);
    prismaMock.player.findMany.mockImplementation(({ where }) =>
      Promise.resolve(players.filter((p) => where.id.in.includes(p.id))),
    );
    prismaMock.$transaction.mockImplementation((fn) => fn(prismaMock));
    service = new TeamsService(prismaMock as never);
  });

  describe('createTeam', () => {
    it('creates a team for the current season', async () => {
      prismaMock.fantasyTeam.findUnique.mockResolvedValue(null);
      prismaMock.fantasyTeam.create.mockResolvedValue(team);

      await service.createTeam('u1', 'Atlas Lions');

      expect(prismaMock.fantasyTeam.create).toHaveBeenCalledWith({
        data: { userId: 'u1', seasonId: 'comp1', name: 'Atlas Lions' },
        include: { squadSlots: true },
      });
    });

    it('rejects a second team for the same season', async () => {
      await expect(service.createTeam('u1', 'Dupe')).rejects.toBeInstanceOf(
        BadRequestException,
      );
    });
  });

  describe('updateSquad', () => {
    const dto: { slots: UpdateSquadSlotDto[] } = {
      slots: [
        { playerId: 'p1', position: 'GK1', isCaptain: true },
        { playerId: 'p2', position: 'DEF1' },
        { playerId: 'p3', position: 'MID1' },
        { playerId: 'p4', position: 'FWD1', isViceCaptain: true },
      ],
    };

    it('rejects a squad over 15 players', async () => {
      const slots: UpdateSquadSlotDto[] = Array.from(
        { length: 16 },
        (_, i) => ({ playerId: `p${i}`, position: 'SUB1' }),
      );
      await expect(
        service.updateSquad('u1', { slots }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects a player in a mismatched position', async () => {
      await expect(
        service.updateSquad('u1', {
          slots: [{ playerId: 'p1', position: 'FWD1' }],
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects when the squad value exceeds the budget', async () => {
      const squad: UpdateSquadSlotDto[] = [
        { playerId: 'p4', position: 'FWD1' },
        { playerId: 'p5', position: 'FWD2' },
      ];
      prismaMock.player.findMany.mockImplementation(({ where }) =>
        Promise.resolve(
          players
            .filter((p) => where.id.in.includes(p.id))
            .map((p) => ({ ...p, currentPrice: 60 })),
        ),
      );

      await expect(
        service.updateSquad('u1', { slots: squad }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('replaces slots with server-side purchase prices', async () => {
      await service.updateSquad('u1', dto);

      expect(prismaMock.squadSlot.deleteMany).toHaveBeenCalledWith({
        where: { teamId: 't1' },
      });
      expect(prismaMock.squadSlot.createMany).toHaveBeenCalledWith({
        data: expect.arrayContaining([
          expect.objectContaining({
            teamId: 't1',
            playerId: 'p1',
            position: 'GK1',
            isCaptain: true,
            purchasedPrice: 5,
          }),
        ]),
      });
      expect(prismaMock.fantasyTeam.update).toHaveBeenCalledWith({
        where: { id: 't1' },
        data: { value: 29, budgetRemaining: 71 },
      });
    });

    it('throws when no team exists', async () => {
      prismaMock.fantasyTeam.findUnique.mockResolvedValue(null);
      await expect(service.updateSquad('u1', dto)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });
});