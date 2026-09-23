import { ServiceUnavailableException } from '@nestjs/common';
import {
  BsdSyncService,
  normalizeIncident,
  unwrap,
} from '../src/modules/integrations/bsd/bsd-sync.service';
import { BsdClient } from '../src/modules/integrations/bsd/bsd.client';
import {
  BSD_POSITION_MAP,
  BSD_STATUS_MAP,
  priceFromMarketValue,
  splitName,
} from '../src/modules/integrations/bsd/bsd.constants';

describe('BSD mappers', () => {
  it('maps positions G/D/M/F to squad positions', () => {
    expect(BSD_POSITION_MAP).toEqual({
      G: 'GK',
      D: 'DEF',
      M: 'MID',
      F: 'FWD',
    });
  });

  it('maps event statuses to fixture statuses', () => {
    expect(BSD_STATUS_MAP.finished).toBe('FINISHED');
    expect(BSD_STATUS_MAP.upcoming).toBe('SCHEDULED');
    expect(BSD_STATUS_MAP.live).toBe('LIVE');
    expect(BSD_STATUS_MAP.postponed).toBe('POSTPONED');
    expect(BSD_STATUS_MAP.cancelled).toBe('CANCELLED');
  });

  it('prices unknown market values at the floor', () => {
    expect(priceFromMarketValue(null)).toBe(4.0);
    expect(priceFromMarketValue(0)).toBe(4.0);
  });

  it('scales prices logarithmically and clamps the ceiling', () => {
    const mid = priceFromMarketValue(50000);
    expect(mid).toBeGreaterThan(4.0);
    expect(mid).toBeLessThan(8.0);
    expect(priceFromMarketValue(5000000)).toBe(12.0);
    expect(priceFromMarketValue(50000000)).toBe(13.0);
  });

  it('splits display names into first/last', () => {
    expect(splitName('Soufiane Benjdida')).toEqual({
      firstName: 'Soufiane',
      lastName: 'Benjdida',
    });
    expect(splitName('Pele')).toEqual({ firstName: '', lastName: 'Pele' });
  });

  it('normalizes goals with their minute', () => {
    expect(
      normalizeIncident({ type: 'goal', minute: 23, player_id: 7, goal_type: 'regular' }),
    ).toEqual({ type: 'GOAL', minute: 23, bsdPlayerId: 7, bsdTeamId: null, isHome: null });
  });

  it('normalizes cards and skips rescinded ones', () => {
    expect(
      normalizeIncident({ type: 'card', card_type: 'yellow', minute: 55, player_id: 9 }),
    ).toEqual({ type: 'YELLOW_CARD', minute: 55, bsdPlayerId: 9, bsdTeamId: null, isHome: null });
    expect(
      normalizeIncident({ type: 'card', card_type: 'red', minute: 90, player_id: 9 }),
    ).toEqual({ type: 'RED_CARD', minute: 90, bsdPlayerId: 9, bsdTeamId: null, isHome: null });
    expect(
      normalizeIncident({ type: 'card', card_type: 'yellow', minute: 10, player_id: 9, rescinded: true }),
    ).toBeNull();
  });

  it('maps own goals and missed penalties', () => {
    expect(normalizeIncident({ type: 'goal', goal_type: 'own_goal', minute: 33 })).toEqual({
      type: 'OWN_GOAL',
      minute: 33,
      bsdPlayerId: null,
      bsdTeamId: null,
      isHome: null,
    });
    expect(normalizeIncident({ type: 'goal', goal_type: 'missed_penalty', minute: 61 })).toEqual({
      type: 'PENALTY_MISSED',
      minute: 61,
      bsdPlayerId: null,
      bsdTeamId: null,
      isHome: null,
    });
  });

  it('resolves the team from the incident side', () => {
    expect(
      normalizeIncident({ type: 'goal', minute: 12, player_id: 1, is_home: true }),
    ).toEqual({ type: 'GOAL', minute: 12, bsdPlayerId: 1, bsdTeamId: null, isHome: true });
  });

  it('skips periods, substitutions and unknown types', () => {
    expect(normalizeIncident({ type: 'period', minute: 90 })).toBeNull();
    expect(normalizeIncident({ type: 'substitution', minute: 70 })).toBeNull();
    expect(normalizeIncident({ type: 'var_review', minute: 71 })).toBeNull();
    expect(normalizeIncident({})).toBeNull();
  });

  it('unwraps every BSD envelope shape', () => {
    expect(unwrap([1, 2])).toEqual([1, 2]);
    expect(unwrap({ players: [1] })).toEqual([1]);
    expect(unwrap({ incidents: [2] })).toEqual([2]);
    expect(unwrap({ player_stats: [3] })).toEqual([3]);
    expect(unwrap({ seasons: [4] })).toEqual([4]);
    expect(unwrap({ results: [5] })).toEqual([5]);
    expect(unwrap({})).toEqual([]);
  });
});

describe('BsdClient', () => {
  it('refuses to call the API without a token', async () => {
    const saved = process.env.BSD_API_TOKEN;
    delete process.env.BSD_API_TOKEN;
    try {
      await expect(new BsdClient().get('/teams/')).rejects.toBeInstanceOf(
        ServiceUnavailableException,
      );
    } finally {
      if (saved !== undefined) process.env.BSD_API_TOKEN = saved;
    }
  });
});

describe('BsdSyncService', () => {
  const prismaMock = {
    competition: { findFirst: jest.fn(), findUnique: jest.fn(), create: jest.fn() },
    club: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    player: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    gameweek: { findUnique: jest.fn(), create: jest.fn() },
    fixture: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    matchEvent: { deleteMany: jest.fn(), create: jest.fn() },
  };

  const bsdMock = {
    listTeams: jest.fn(),
    getSquad: jest.fn(),
    getPlayer: jest.fn(),
    listEvents: jest.fn(),
    getIncidents: jest.fn(),
    getPlayerStats: jest.fn(),
    getSeasons: jest.fn(),
    imageUrl: jest.fn((kind: string, id: number) => `https://img/${kind}/${id}/`),
  };

  let service: BsdSyncService;

  beforeEach(() => {
    jest.clearAllMocks();
    prismaMock.competition.findFirst.mockResolvedValue({ id: 'comp1' });
    service = new BsdSyncService(
      prismaMock as never,
      bsdMock as unknown as BsdClient,
    );
  });

  it('syncClubs creates new clubs and skips teams outside the allowlist', async () => {
    bsdMock.listTeams.mockResolvedValue([
      { id: 586, name: 'AS FAR Rabat', short_name: 'ASFAR' },
      { id: 9999, name: 'Some Other Club' },
    ]);
    prismaMock.club.findUnique.mockResolvedValue(null);
    prismaMock.club.create.mockImplementation(({ data }: never) =>
      Promise.resolve({ id: 'c1', ...(data as object) }),
    );

    const result = await service.syncClubs();

    expect(prismaMock.club.create).toHaveBeenCalledTimes(1);
    expect(prismaMock.club.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ name: 'AS FAR Rabat', externalId: 586 }),
    });
    expect(result.created).toBe(1);
    expect(result.skipped).toBe(1);
  });

  it('syncClubs refuses when nothing matches the allowlist', async () => {
    bsdMock.listTeams.mockResolvedValue([{ id: 1, name: 'Elsewhere FC' }]);
    await expect(service.syncClubs()).rejects.toThrow(
      'No Botola clubs matched the allowlist',
    );
  });

  it('syncSquads upserts players with mapped positions', async () => {
    prismaMock.club.findMany.mockResolvedValue([{ id: 'c1', externalId: 586 }]);
    bsdMock.getSquad.mockResolvedValue({
      team_id: 586,
      count: 2,
      players: [
        {
          id: 14738,
          name: 'To Carneiro',
          position: 'D',
          jersey_number: 2,
          availability: 'available',
        },
        { id: 4242, name: 'Mystery Man', position: '' },
      ],
    });
    prismaMock.player.findUnique.mockResolvedValue(null);
    prismaMock.player.create.mockResolvedValue({ id: 'p1' });

    const result = await service.syncSquads();

    expect(prismaMock.player.create).toHaveBeenCalledTimes(1);
    expect(prismaMock.player.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        clubId: 'c1',
        firstName: 'To',
        lastName: 'Carneiro',
        position: 'DEF',
        shirtNumber: 2,
        externalId: 14738,
      }),
    });
    expect(result.created).toBe(1);
    expect(result.skipped).toBe(1);
  });

  it('syncResults merges incidents with player stats', async () => {
    bsdMock.getSeasons.mockResolvedValue({
      league_id: 53,
      count: 1,
      seasons: [{ id: 1085, name: 'Botola Pro D1 25/26', year: 2025 }],
    });
    prismaMock.competition.findUnique.mockResolvedValue({ id: 'comp1' });
    prismaMock.fixture.findUnique.mockImplementation(({ where }: never) => {
      const w = where as { externalId: number };
      return Promise.resolve(w.externalId === 206720 ? { id: 'f1', homeScore: null, awayScore: null } : null);
    });
    prismaMock.fixture.update.mockResolvedValue({});
    prismaMock.player.findMany.mockResolvedValue([{ id: 'p1', externalId: 49676 }]);
    bsdMock.listEvents.mockResolvedValue([
      { id: 206720, home_score: 1, away_score: 1, stage: 'league-phase' },
      { id: 999999, home_score: 2, away_score: 0, stage: 'league-phase' },
    ]);
    bsdMock.getIncidents.mockResolvedValue({
      event_id: 206720,
      incidents: [
        { type: 'goal', minute: 23, player_id: 49676, goal_type: 'regular' },
        { type: 'card', card_type: 'yellow', minute: 55, player_id: 12345 },
        { type: 'period', minute: 90 },
      ],
    });
    bsdMock.getPlayerStats.mockResolvedValue({
      event_id: 206720,
      count: 2,
      player_stats: [
        { player_id: 49676, team_id: 1, minutes_played: 90, goals: 1, goal_assist: 1, saves: 0 },
        { player_id: 12345, team_id: 2, minutes_played: 90, goals: 0, yellow_card: 1, saves: 3 },
      ],
    });
    prismaMock.matchEvent.deleteMany.mockResolvedValue({});
    prismaMock.matchEvent.create.mockResolvedValue({});

    const result = await service.syncResults(1085);

    expect(prismaMock.fixture.update).toHaveBeenCalledWith({
      where: { id: 'f1' },
      data: { homeScore: 1, awayScore: 1, status: 'FINISHED' },
    });
    const created = prismaMock.matchEvent.create.mock.calls.map(
      (call) => (call[0] as { data: { type: string; minute: number; playerId: string | null } }).data,
    );
    expect(created).toContainEqual(
      expect.objectContaining({ type: 'GOAL', minute: 23, playerId: 'p1' }),
    );
    expect(created).toContainEqual(
      expect.objectContaining({ type: 'ASSIST', minute: 0, playerId: 'p1' }),
    );
    expect(created).toContainEqual(
      expect.objectContaining({ type: 'APPEARANCE', minute: 0, playerId: 'p1' }),
    );
    expect(created).toContainEqual(
      expect.objectContaining({ type: 'YELLOW_CARD', minute: 55, playerId: null }),
    );
    expect(created.filter((row) => row.type === 'SAVE')).toHaveLength(3);
    expect(created.some((row) => row.type === 'GOAL_CONCEDED')).toBe(false);
    expect(result.updated).toBe(1);
    // 1 unknown fixture + 1 unresolvable backfill player (team not synced)
    expect(result.skipped).toBe(2);
  });

  it('mergeFixtureEvents tops up stats missing from the timeline', () => {
    const rows = service.mergeFixtureEvents(
      [{ type: 'goal', minute: 23, player_id: 1 }],
      [{ player_id: 1, team_id: 9, minutes_played: 90, goals: 2, goal_assist: 1 }],
      9,
      10,
    );
    expect(rows.filter((row) => row.type === 'GOAL')).toHaveLength(2);
    expect(rows).toContainEqual({
      type: 'ASSIST',
      minute: 0,
      bsdPlayerId: 1,
      bsdTeamId: 9,
      isHome: null,
    });
    expect(rows).toContainEqual({
      type: 'APPEARANCE',
      minute: 0,
      bsdPlayerId: 1,
      bsdTeamId: 9,
      isHome: null,
    });
    expect(rows).toContainEqual({
      type: 'GOAL',
      minute: 23,
      bsdPlayerId: 1,
      bsdTeamId: null,
      isHome: null,
    });
  });

  it('backfills players missing from squads and links their events', async () => {
    bsdMock.getSeasons.mockResolvedValue({
      league_id: 53,
      count: 1,
      seasons: [{ id: 1085, name: 'Botola Pro D1 25/26', year: 2025 }],
    });
    prismaMock.competition.findUnique.mockResolvedValue({ id: 'comp1' });
    prismaMock.club.findMany.mockResolvedValue([{ id: 'c1', externalId: 2071 }]);
    prismaMock.fixture.findUnique.mockResolvedValue({ id: 'f1', homeScore: 0, awayScore: 0 });
    prismaMock.fixture.update.mockResolvedValue({});
    prismaMock.player.findMany.mockResolvedValue([]);
    bsdMock.listEvents.mockResolvedValue([
      { id: 7, home_score: 2, away_score: 0, stage: 'league-phase', home_team_id: 2071, away_team_id: 2064 },
    ]);
    bsdMock.getIncidents.mockResolvedValue({ event_id: 7, incidents: [] });
    bsdMock.getPlayerStats.mockResolvedValue({
      event_id: 7,
      count: 1,
      player_stats: [{ player_id: 49676, team_id: 2071, minutes_played: 90, goals: 2 }],
    });
    bsdMock.getPlayer.mockResolvedValue({
      id: 49676,
      name: 'Soufiane Benjdida',
      position: 'F',
      market_value_eur: 2300000,
    });
    prismaMock.player.create.mockResolvedValue({ id: 'p9' });
    prismaMock.matchEvent.deleteMany.mockResolvedValue({});
    prismaMock.matchEvent.create.mockResolvedValue({});

    await service.syncResults(1085);

    expect(bsdMock.getPlayer).toHaveBeenCalledWith(49676);
    expect(prismaMock.player.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        clubId: 'c1',
        firstName: 'Soufiane',
        lastName: 'Benjdida',
        position: 'FWD',
        externalId: 49676,
      }),
    });
    const created = prismaMock.matchEvent.create.mock.calls.map(
      (call) => (call[0] as { data: { type: string; playerId: string | null } }).data,
    );
    expect(created.filter((row) => row.type === 'GOAL' && row.playerId === 'p9')).toHaveLength(2);
  });
});
