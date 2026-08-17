import { ScoringService } from '../src/modules/scoring/scoring.service';
import { GameweeksService } from '../src/modules/gameweeks/gameweeks.service';
import { BadRequestException } from '@nestjs/common';

describe('GameweeksService', () => {
  const fixture = {
    id: 'f1',
    homeClubId: 'c1',
    awayClubId: 'c2',
    homeScore: 2,
    awayScore: 1,
    matchEvents: [
      { playerId: 'p1', type: 'GOAL' },
      { playerId: 'p2', type: 'ASSIST' },
      { playerId: 'p3', type: 'GOAL_CONCEDED' },
      { playerId: 'p3', type: 'GOAL_CONCEDED' },
    ],
  };

  const entry = {
    id: 'e1',
    teamId: 't1',
    captainId: 'p1',
    viceCaptainId: 'p2',
    team: {
      squadSlots: [{ playerId: 'p1' }, { playerId: 'p2' }, { playerId: 'p3' }],
    },
  };

  const gameweek = {
    id: 'g1',
    status: 'LIVE',
    fixtures: [fixture],
    entries: [entry],
  };

  const players = [
    { id: 'p1', clubId: 'c1', position: 'MID' },
    { id: 'p2', clubId: 'c1', position: 'FWD' },
    { id: 'p3', clubId: 'c2', position: 'GK' },
  ];

  const prismaMock = {
    gameweek: {
      findUnique: jest.fn(),
      update: jest.fn().mockResolvedValue({}),
    },
    player: {
      findMany: jest.fn(),
    },
    gameweekPoints: {
      upsert: jest.fn().mockResolvedValue({}),
    },
    gameweekEntry: {
      update: jest.fn().mockResolvedValue({}),
    },
    fantasyTeam: {
      update: jest.fn().mockResolvedValue({}),
    },
  };

  let service: GameweeksService;

  beforeEach(() => {
    jest.clearAllMocks();
    prismaMock.gameweek.findUnique.mockResolvedValue(gameweek);
    prismaMock.player.findMany.mockResolvedValue(players);
    service = new GameweeksService(
      prismaMock as never,
      new ScoringService(prismaMock as never),
    );
  });

  it('throws when the gameweek has no finished fixtures', async () => {
    prismaMock.gameweek.findUnique.mockResolvedValue({
      ...gameweek,
      fixtures: [],
    });

    await expect(service.process('g1')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('computes points, applies the captain multiplier and locks the gameweek', async () => {
    const result = await service.process('g1');

    expect(prismaMock.gameweekPoints.upsert).toHaveBeenCalledTimes(3);
    expect(prismaMock.gameweekEntry.update).toHaveBeenCalledWith({
      where: { id: 'e1' },
      data: { points: 20, status: 'LOCKED' },
    });
    expect(prismaMock.fantasyTeam.update).toHaveBeenCalledWith({
      where: { id: 't1' },
      data: { totalPoints: { increment: 20 } },
    });
    expect(prismaMock.gameweek.update).toHaveBeenCalledWith({
      where: { id: 'g1' },
      data: { status: 'FINISHED' },
    });
    expect(result).toEqual({
      gameweekId: 'g1',
      processed: 1,
      pointsByEntry: { e1: 20 },
    });
  });

  it('awards half the vice captain points when the captain did not play', async () => {
    prismaMock.gameweek.findUnique.mockResolvedValue({
      ...gameweek,
      entries: [
        {
          ...entry,
          captainId: 'pX',
          team: { squadSlots: [{ playerId: 'p2' }] },
        },
      ],
    });

    const result = await service.process('g1');

    expect(result.pointsByEntry).toEqual({ e1: 7 });
  });
});