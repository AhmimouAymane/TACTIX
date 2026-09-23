import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MatchEventType, PlayerStatus } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { BsdClient } from './bsd.client';
import {
  BOTOLA_CLUB_IDS,
  BOTOLA_LEAGUE_ID,
  BSD_POSITION_MAP,
  BSD_STATUS_MAP,
  SYNCED_STAGES,
  priceFromMarketValue,
  splitName,
} from './bsd.constants';
import {
  BsdEvent,
  BsdIncident,
  BsdPlayerStat,
} from './bsd.types';

export interface SyncSummary {
  scope: string;
  created: number;
  updated: number;
  skipped: number;
  notes: string[];
}

interface TimedRow {
  type: MatchEventType;
  minute: number;
  bsdPlayerId: number | null;
  bsdTeamId: number | null;
  isHome: boolean | null;
}

/** Accepts every envelope shape the BSD API serves. */
export function unwrap<T>(page: unknown): T[] {
  if (Array.isArray(page)) return page as T[];
  if (page && typeof page === 'object') {
    const obj = page as Record<string, unknown>;
    for (const key of ['players', 'incidents', 'player_stats', 'seasons', 'results']) {
      if (Array.isArray(obj[key])) return obj[key] as T[];
    }
  }
  return [];
}

/**
 * Maps a BSD incident to a scoring event.
 * Real shape: {type: 'goal'|'card'|'substitution'|'period', minute,
 * card_type: 'yellow'|'red', goal_type: 'regular'|..., player_id}.
 * Anything unrecognized returns null and is counted as skipped.
 */
export function normalizeIncident(raw: BsdIncident): TimedRow | null {
  if (raw.rescinded === true) return null;

  const type = String(raw.type ?? '').toLowerCase();
  if (!type || type === 'period' || type === 'subst' || type.includes('var')) {
    return null;
  }
  if (type.includes('substitution')) return null;

  const minute = typeof raw.minute === 'number' ? raw.minute : 0;
  const bsdPlayerId = typeof raw.player_id === 'number' ? raw.player_id : null;
  const bsdTeamId = typeof raw.team_id === 'number' ? raw.team_id : null;
  const isHome = typeof raw.is_home === 'boolean' ? raw.is_home : null;

  if (type.includes('goal')) {
    const goalType = String(raw.goal_type ?? '').toLowerCase();
    if (goalType.includes('own')) {
      return { type: 'OWN_GOAL', minute, bsdPlayerId, bsdTeamId, isHome };
    }
    if (goalType.includes('miss') || goalType.includes('saved')) {
      return { type: 'PENALTY_MISSED', minute, bsdPlayerId, bsdTeamId, isHome };
    }
    return { type: 'GOAL', minute, bsdPlayerId, bsdTeamId, isHome };
  }
  if (type.includes('card')) {
    const card = String(raw.card_type ?? '').toLowerCase();
    if (card.includes('red')) {
      return { type: 'RED_CARD', minute, bsdPlayerId, bsdTeamId, isHome };
    }
    if (card.includes('yellow')) {
      return { type: 'YELLOW_CARD', minute, bsdPlayerId, bsdTeamId, isHome };
    }
    return null;
  }
  if (type.includes('penalty') && type.includes('save')) {
    return { type: 'PENALTY_SAVED', minute, bsdPlayerId, bsdTeamId, isHome };
  }
  return null;
}

@Injectable()
export class BsdSyncService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bsd: BsdClient,
  ) {}

  private summary(scope: string): SyncSummary {
    return { scope, created: 0, updated: 0, skipped: 0, notes: [] };
  }

  async syncClubs(seasonId?: number): Promise<SyncSummary> {
    const result = this.summary('clubs');
    const teams = await this.bsd.listTeams(BOTOLA_LEAGUE_ID, seasonId);
    const wanted = teams.filter((team) => BOTOLA_CLUB_IDS.includes(team.id));

    if (wanted.length === 0) {
      throw new BadRequestException(
        'No Botola clubs matched the allowlist — re-check BSD team ids',
      );
    }

    for (const team of wanted) {
      const shortName =
        team.short_name ??
        team.name.replace(/[^A-Za-z]/g, '').slice(0, 3).toUpperCase();
      const existing = await this.prisma.club.findUnique({
        where: { externalId: team.id },
      });
      if (existing) {
        await this.prisma.club.update({
          where: { id: existing.id },
          data: { name: team.name, crestUrl: this.bsd.imageUrl('team', team.id) },
        });
        result.updated += 1;
      } else {
        await this.prisma.club.create({
          data: {
            name: team.name,
            shortName,
            crestUrl: this.bsd.imageUrl('team', team.id),
            externalId: team.id,
          },
        });
        result.created += 1;
      }
    }

    const unknown = teams
      .filter((team) => !BOTOLA_CLUB_IDS.includes(team.id))
      .map((team) => `${team.name} (${team.id})`);
    if (unknown.length > 0) {
      result.notes.push(`Not in allowlist: ${unknown.join(', ')}`);
      result.skipped += unknown.length;
    }
    return result;
  }

  async syncSquads(): Promise<SyncSummary> {
    const result = this.summary('squads');
    const clubs = await this.prisma.club.findMany({
      where: { externalId: { not: null } },
    });

    for (const club of clubs) {
      const squad = await this.bsd.getSquad(club.externalId!);
      for (const rawEntry of squad.players ?? []) {
        const position = BSD_POSITION_MAP[String(rawEntry.position ?? '').toUpperCase()];
        if (!position) {
          result.skipped += 1;
          continue;
        }
        const names = splitName(rawEntry.name ?? `Player ${rawEntry.id}`);
        const availability = String(rawEntry.availability ?? 'available').toLowerCase();
        const status: PlayerStatus =
          availability === 'injured'
            ? 'INJURED'
            : availability === 'suspended'
              ? 'SUSPENDED'
              : 'ACTIVE';

        const existing = await this.prisma.player.findUnique({
          where: { externalId: rawEntry.id },
        });
        const data = {
          clubId: club.id,
          firstName: names.firstName,
          lastName: names.lastName || names.firstName,
          position,
          shirtNumber: rawEntry.jersey_number ?? null,
          photoUrl: this.bsd.imageUrl('player', rawEntry.id),
          status,
          currentPrice: 4.0,
        };
        if (existing) {
          await this.prisma.player.update({ where: { id: existing.id }, data });
          result.updated += 1;
        } else {
          await this.prisma.player.create({
            data: { ...data, startingPrice: 4.0, externalId: rawEntry.id },
          });
          result.created += 1;
        }
      }
    }
    return result;
  }

  /** Enriches synced players with market-value-based prices (one /players/ call each). */
  async syncPrices(): Promise<SyncSummary> {
    const result = this.summary('prices');
    const players = await this.prisma.player.findMany({
      where: { externalId: { not: null } },
      select: { id: true, externalId: true },
    });

    const queue = [...players];
    const workers = Array.from({ length: 8 }, async () => {
      while (queue.length > 0) {
        const player = queue.pop()!;
        try {
          const detail = await this.bsd.getPlayer(player.externalId!);
          const price = priceFromMarketValue(detail.market_value_eur);
          await this.prisma.player.update({
            where: { id: player.id },
            data: { currentPrice: price },
          });
          result.updated += 1;
        } catch {
          result.skipped += 1;
        }
      }
    });
    await Promise.all(workers);
    return result;
  }

  async syncFixtures(seasonId: number): Promise<SyncSummary> {
    const result = this.summary('fixtures');
    const competition = await this.seasonCompetition(seasonId);
    const events = await this.bsd.listEvents({
      league_id: BOTOLA_LEAGUE_ID,
      season_id: seasonId,
    });

    const clubs = await this.prisma.club.findMany({
      where: { externalId: { not: null } },
      select: { id: true, externalId: true },
    });
    const clubByExternalId = new Map(
      clubs.map((club) => [club.externalId!, club.id]),
    );

    const byRound = new Map<number, BsdEvent[]>();
    for (const event of events) {
      if (event.stage && !SYNCED_STAGES.includes(event.stage)) {
        result.skipped += 1;
        continue;
      }
      if (!event.round_number) {
        result.skipped += 1;
        continue;
      }
      if (!byRound.has(event.round_number)) byRound.set(event.round_number, []);
      byRound.get(event.round_number)!.push(event);
    }

    for (const [round, roundEvents] of [...byRound.entries()].sort((a, b) => a[0] - b[0])) {
      const kickoffs = roundEvents
        .map((event) => this.kickoffOf(event))
        .filter((date): date is Date => date !== null)
        .sort((a, b) => a.getTime() - b.getTime());
      if (kickoffs.length === 0) {
        result.skipped += roundEvents.length;
        continue;
      }

      let gameweek = await this.prisma.gameweek.findUnique({
        where: { competitionId_number: { competitionId: competition.id, number: round } },
      });
      if (!gameweek) {
        gameweek = await this.prisma.gameweek.create({
          data: {
            competitionId: competition.id,
            number: round,
            deadlineAt: new Date(kickoffs[0].getTime() - 60 * 60 * 1000),
            status: 'UPCOMING',
          },
        });
      }

      for (const event of roundEvents) {
        const homeId = clubByExternalId.get(event.home_team_id ?? -1);
        const awayId = clubByExternalId.get(event.away_team_id ?? -1);
        const kickoff = this.kickoffOf(event);
        if (!homeId || !awayId || !kickoff) {
          result.skipped += 1;
          continue;
        }
        const status = BSD_STATUS_MAP[String(event.status ?? 'upcoming').toLowerCase()] ?? 'SCHEDULED';
        const existing = await this.prisma.fixture.findUnique({
          where: { externalId: event.id },
        });
        const data = {
          competitionId: competition.id,
          gameweekId: gameweek.id,
          homeClubId: homeId,
          awayClubId: awayId,
          kickoffAt: kickoff,
          status,
          homeScore: event.home_score ?? null,
          awayScore: event.away_score ?? null,
        };
        if (existing) {
          await this.prisma.fixture.update({ where: { id: existing.id }, data });
          result.updated += 1;
        } else {
          await this.prisma.fixture.create({ data: { ...data, externalId: event.id } });
          result.created += 1;
        }
      }
    }
    return result;
  }

  async syncResults(seasonId: number, round?: number, stage = 'league-phase'): Promise<SyncSummary> {
    const result = this.summary('results');
    await this.seasonCompetition(seasonId);
    const params: Record<string, string | number> = {
      league_id: BOTOLA_LEAGUE_ID,
      season_id: seasonId,
      status: 'finished',
    };
    // NOTE: the BSD API requires `stage` whenever `round` is set —
    // a bare round is silently ignored and returns the whole season.
    if (round) {
      params.round = round;
      params.stage = stage;
    }
    const events = await this.bsd.listEvents(params);

    const players = await this.prisma.player.findMany({
      where: { externalId: { not: null } },
      select: { id: true, externalId: true },
    });
    const playerByExternalId = new Map(
      players.map((player) => [player.externalId!, player.id]),
    );
    const clubs = await this.prisma.club.findMany({
      where: { externalId: { not: null } },
      select: { id: true, externalId: true },
    });
    const clubByExternalId = new Map(
      clubs.map((club) => [club.externalId!, club.id]),
    );

    for (const event of events) {
      if (event.stage && !SYNCED_STAGES.includes(event.stage)) {
        result.skipped += 1;
        continue;
      }
      const fixture = await this.prisma.fixture.findUnique({
        where: { externalId: event.id },
      });
      if (!fixture) {
        result.skipped += 1;
        result.notes.push(`No local fixture for BSD event ${event.id}`);
        continue;
      }

      await this.prisma.fixture.update({
        where: { id: fixture.id },
        data: {
          homeScore: event.home_score ?? fixture.homeScore,
          awayScore: event.away_score ?? fixture.awayScore,
          status: 'FINISHED',
        },
      });

      const [incidents, stats] = await Promise.all([
        this.bsd.getIncidents(event.id),
        this.bsd.getPlayerStats(event.id),
      ]);
      const incidentRows = unwrap<BsdIncident>(incidents);
      const statRows = unwrap<BsdPlayerStat>(stats);
      await this.backfillUnknownPlayers(
        result,
        playerByExternalId,
        clubByExternalId,
        event,
        incidentRows,
        statRows,
      );
      const rows = this.mergeFixtureEvents(
        incidentRows,
        statRows,
        event.home_team_id,
        event.away_team_id,
      );

      await this.prisma.matchEvent.deleteMany({ where: { fixtureId: fixture.id } });
      let created = 0;
      for (const [index, row] of rows.entries()) {
        const playerId = row.bsdPlayerId
          ? (playerByExternalId.get(row.bsdPlayerId) ?? null)
          : null;
        const side =
          row.bsdTeamId == null || event.home_team_id == null
            ? null
            : row.bsdTeamId === event.home_team_id
              ? 'home'
              : row.bsdTeamId === event.away_team_id
                ? 'away'
                : null;
        await this.prisma.matchEvent.create({
          data: {
            fixtureId: fixture.id,
            minute: row.minute,
            type: row.type,
            playerId,
            detail: JSON.stringify({
              source: 'bsd',
              side,
              unresolvedBsdPlayerId: playerId ? null : row.bsdPlayerId,
            }),
            sequence: index,
            verified: false,
          },
          select: { id: true },
        });
        created += 1;
      }
      result.created += created;
      result.updated += 1;
    }
    return result;
  }

  /**
   * Creates local players for BSD ids seen in match data but missing from
   * synced squads (transferred-out players, youth call-ups). The club comes
   * from the stat team_id (or the incident side), so historical rows stay
   * linked to the right club.
   */
  private async backfillUnknownPlayers(
    result: SyncSummary,
    playerByExternalId: Map<number, string>,
    clubByExternalId: Map<number, string>,
    event: BsdEvent,
    incidents: BsdIncident[],
    stats: BsdPlayerStat[],
  ): Promise<void> {
    const teamByPlayer = new Map<number, number>();
    for (const stat of stats) {
      if (stat.player_id != null && stat.team_id != null) {
        teamByPlayer.set(stat.player_id, stat.team_id);
      }
    }
    for (const incident of incidents) {
      if (incident.player_id == null || teamByPlayer.has(incident.player_id)) {
        continue;
      }
      const sideId =
        incident.is_home === true
          ? event.home_team_id
          : incident.is_home === false
            ? event.away_team_id
            : null;
      if (sideId != null) teamByPlayer.set(incident.player_id, sideId);
    }

    for (const [bsdId, teamBsdId] of teamByPlayer) {
      if (playerByExternalId.has(bsdId)) continue;
      const clubId = clubByExternalId.get(teamBsdId);
      if (!clubId) {
        result.skipped += 1;
        continue;
      }
      let detail;
      try {
        detail = await this.bsd.getPlayer(bsdId);
      } catch {
        result.skipped += 1;
        continue;
      }
      const position = BSD_POSITION_MAP[String(detail.position ?? '').toUpperCase()];
      if (!position || !detail.name) {
        result.skipped += 1;
        continue;
      }
      const names = splitName(detail.name);
      const price = priceFromMarketValue(detail.market_value_eur);
      const created = await this.prisma.player.create({
        data: {
          clubId,
          firstName: names.firstName,
          lastName: names.lastName || names.firstName,
          position,
          photoUrl: this.bsd.imageUrl('player', bsdId),
          startingPrice: price,
          currentPrice: price,
          externalId: bsdId,
        },
      });
      playerByExternalId.set(bsdId, created.id);
      result.created += 1;
    }
  }

  /**
   * Merges minute-level incidents (timeline) with per-player stats (totals).
   * Incidents win on timing; stats top up missing counts and are the only
   * source of assists, saves and appearances. Conceded/clean sheets are left
   * to the score-derived fallback in the scoring engine.
   */
  mergeFixtureEvents(
    incidents: BsdIncident[],
    stats: BsdPlayerStat[],
    homeBsdId?: number,
    awayBsdId?: number,
  ): TimedRow[] {
    const teamOf = (row: TimedRow): number | null => {
      if (row.bsdTeamId != null) return row.bsdTeamId;
      if (row.isHome === true && homeBsdId != null) return homeBsdId;
      if (row.isHome === false && awayBsdId != null) return awayBsdId;
      return null;
    };

    const timed = incidents
      .map((raw) => normalizeIncident(raw))
      .filter((row): row is TimedRow => row !== null)
      .map((row) => ({ ...row, bsdTeamId: teamOf(row) }));

    const goalsByPlayer = new Map<number | null, number>();
    const yellowsByPlayer = new Map<number | null, number>();
    const redsByPlayer = new Map<number | null, number>();
    for (const row of timed) {
      if (row.type === 'GOAL' || row.type === 'OWN_GOAL') {
        goalsByPlayer.set(row.bsdPlayerId, (goalsByPlayer.get(row.bsdPlayerId) ?? 0) + 1);
      } else if (row.type === 'YELLOW_CARD') {
        yellowsByPlayer.set(row.bsdPlayerId, (yellowsByPlayer.get(row.bsdPlayerId) ?? 0) + 1);
      } else if (row.type === 'RED_CARD') {
        redsByPlayer.set(row.bsdPlayerId, (redsByPlayer.get(row.bsdPlayerId) ?? 0) + 1);
      }
    }

    const rows: TimedRow[] = [...timed];
    const seen = new Set<number>();
    for (const stat of stats) {
      if (stat.player_id == null || seen.has(stat.player_id)) continue;
      seen.add(stat.player_id);
      const num = (value: number | undefined) =>
        typeof value === 'number' && value > 0 ? Math.floor(value) : 0;
      const push = (type: TimedRow['type'], minute: number) =>
        rows.push({
          type,
          minute,
          bsdPlayerId: stat.player_id,
          bsdTeamId: stat.team_id ?? null,
          isHome: null,
        });

      if (num(stat.minutes_played) > 0) {
        push('APPEARANCE', 0);
      }
      const missingGoals = num(stat.goals) - (goalsByPlayer.get(stat.player_id) ?? 0);
      for (let i = 0; i < missingGoals; i += 1) {
        push('GOAL', 0);
      }
      for (let i = 0; i < num(stat.goal_assist); i += 1) {
        push('ASSIST', 0);
      }
      const missingYellows =
        num(stat.yellow_card) - (yellowsByPlayer.get(stat.player_id) ?? 0);
      for (let i = 0; i < missingYellows; i += 1) {
        push('YELLOW_CARD', 0);
      }
      const missingReds = num(stat.red_card) - (redsByPlayer.get(stat.player_id) ?? 0);
      for (let i = 0; i < missingReds; i += 1) {
        push('RED_CARD', 0);
      }
      for (let i = 0; i < num(stat.saves); i += 1) {
        push('SAVE', 0);
      }
    }
    return rows;
  }

  private async seasonCompetition(seasonId: number) {
    const seasons = await this.bsd.getSeasons(BOTOLA_LEAGUE_ID);
    const season = seasons.seasons.find((s) => s.id === seasonId);
    if (!season) throw new NotFoundException(`BSD season ${seasonId} not found`);

    const code = `BOTOLA-${season.year ?? seasonId}`;
    const existing = await this.prisma.competition.findUnique({ where: { code } });
    if (existing) return existing;

    return this.prisma.competition.create({
      data: {
        name: season.name ?? `Botola Pro ${season.year ?? seasonId}`,
        code,
        country: 'Morocco',
        seasonStart: season.start_date ? new Date(season.start_date) : new Date(),
        seasonEnd: season.end_date ? new Date(season.end_date) : new Date(),
      },
    });
  }

  private kickoffOf(event: BsdEvent): Date | null {
    if (!event.event_date) return null;
    const date = new Date(event.event_date);
    return Number.isNaN(date.getTime()) ? null : date;
  }
}
