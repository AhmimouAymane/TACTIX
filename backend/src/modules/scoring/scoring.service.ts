import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MatchEventType, PlayerPosition } from '@prisma/client';

export interface PlayerScoringInput {
  position: PlayerPosition;
  appeared: boolean;
  goals: number;
  assists: number;
  saves: number;
  penaltySaved: number;
  penaltyMissed: number;
  ownGoals: number;
  yellowCards: number;
  redCards: number;
  goalsConceded: number;
  cleanSheet: boolean;
}

export interface MatchEventSummary {
  playerId: string;
  stats: PlayerScoringInput;
}

const GOAL_POINTS: Record<PlayerPosition, number> = {
  GK: 6,
  DEF: 6,
  MID: 5,
  FWD: 4,
};

const CLEAN_SHEET_POINTS: Record<PlayerPosition, number> = {
  GK: 4,
  DEF: 4,
  MID: 1,
  FWD: 0,
};

@Injectable()
export class ScoringService {
  constructor(private readonly prisma: PrismaService) {}

  computePlayerPoints(input: PlayerScoringInput): number {
    if (!input.appeared) {
      return 0;
    }

    let points = 2;

    points += input.goals * GOAL_POINTS[input.position];
    points += input.assists * 3;
    points += input.penaltySaved * 5;
    points -= input.penaltyMissed * 2;
    points -= input.ownGoals * 2;
    points -= input.yellowCards;
    points -= input.redCards * 3;

    if (input.cleanSheet) {
      points += CLEAN_SHEET_POINTS[input.position];
    }

    if (input.position === 'GK' || input.position === 'DEF') {
      points -= Math.floor(input.goalsConceded / 2);
      if (input.position === 'GK') {
        points += Math.floor(input.saves / 3);
      }
    }

    return Math.max(points, 0);
  }

  summarizeFixtureEvents(events: {
    playerId: string | null;
    type: MatchEventType;
  }[]): Map<string, MatchEventSummary> {
    const summary = new Map<string, MatchEventSummary>();

    for (const event of events) {
      if (!event.playerId || event.type === MatchEventType.VAR_DECISION) {
        continue;
      }

      let entry = summary.get(event.playerId);
      if (!entry) {
        entry = {
          playerId: event.playerId,
          stats: {
            position: PlayerPosition.MID,
            appeared: false,
            goals: 0,
            assists: 0,
            saves: 0,
            penaltySaved: 0,
            penaltyMissed: 0,
            ownGoals: 0,
            yellowCards: 0,
            redCards: 0,
            goalsConceded: 0,
            cleanSheet: false,
          },
        };
        summary.set(event.playerId, entry);
      }

      entry.stats.appeared = true;
      switch (event.type) {
        case MatchEventType.GOAL:
          entry.stats.goals += 1;
          break;
        case MatchEventType.ASSIST:
          entry.stats.assists += 1;
          break;
        case MatchEventType.SAVE:
          entry.stats.saves += 1;
          break;
        case MatchEventType.PENALTY_SAVED:
          entry.stats.penaltySaved += 1;
          break;
        case MatchEventType.PENALTY_MISSED:
          entry.stats.penaltyMissed += 1;
          break;
        case MatchEventType.OWN_GOAL:
          entry.stats.ownGoals += 1;
          break;
        case MatchEventType.YELLOW_CARD:
          entry.stats.yellowCards += 1;
          break;
        case MatchEventType.RED_CARD:
          entry.stats.redCards += 1;
          break;
        case MatchEventType.GOAL_CONCEDED:
          entry.stats.goalsConceded += 1;
          break;
        case MatchEventType.CLEAN_SHEET:
          entry.stats.cleanSheet = true;
          break;
        default:
          break;
      }
    }

    return summary;
  }

  async processGameweek(gameweekId: string) {
    const gameweek = await this.prisma.gameweek.findUnique({
      where: { id: gameweekId },
      include: {
        fixtures: {
          where: { status: 'FINISHED' },
          include: { matchEvents: true },
        },
        entries: {
          include: {
            team: { include: { squadSlots: true } },
          },
        },
      },
    });

    if (!gameweek) {
      throw new BadRequestException('Gameweek not found');
    }

    if (gameweek.fixtures.length === 0) {
      throw new BadRequestException('No finished fixtures for this gameweek');
    }

    const squadPlayerIds = Array.from(
      new Set(
        gameweek.entries.flatMap((entry) =>
          entry.team.squadSlots.map((slot) => slot.playerId),
        ),
      ),
    );

    const players = await this.prisma.player.findMany({
      where: { id: { in: squadPlayerIds } },
    });
    const playerById = new Map(players.map((player) => [player.id, player]));

    let processed = 0;
    const pointsByEntry: Record<string, number> = {};

    for (const entry of gameweek.entries) {
      let entryPoints = 0;
      const playerPoints = new Map<string, number>();

      for (const fixture of gameweek.fixtures) {
        const summary = this.summarizeFixtureEvents(fixture.matchEvents);
        const homeConceded =
          fixture.homeScore === null || fixture.awayScore === null
            ? 0
            : fixture.awayScore;
        const awayConceded =
          fixture.homeScore === null || fixture.awayScore === null
            ? 0
            : fixture.homeScore;

        for (const slot of entry.team.squadSlots) {
          const player = playerById.get(slot.playerId);
          if (!player) {
            continue;
          }

          const playedForHome = player.clubId === fixture.homeClubId;
          const playedForAway = player.clubId === fixture.awayClubId;
          if (!playedForHome && !playedForAway) {
            continue;
          }

          const eventSummary = summary.get(slot.playerId);
          const stats: PlayerScoringInput = {
            position: player.position,
            appeared: eventSummary?.stats.appeared ?? false,
            goals: eventSummary?.stats.goals ?? 0,
            assists: eventSummary?.stats.assists ?? 0,
            saves: eventSummary?.stats.saves ?? 0,
            penaltySaved: eventSummary?.stats.penaltySaved ?? 0,
            penaltyMissed: eventSummary?.stats.penaltyMissed ?? 0,
            ownGoals: eventSummary?.stats.ownGoals ?? 0,
            yellowCards: eventSummary?.stats.yellowCards ?? 0,
            redCards: eventSummary?.stats.redCards ?? 0,
            goalsConceded:
              eventSummary?.stats.goalsConceded ??
              (playedForHome ? homeConceded : awayConceded),
            cleanSheet:
              eventSummary?.stats.cleanSheet ??
              (player.position === 'GK' || player.position === 'DEF'
                ? playedForHome
                  ? (fixture.awayScore ?? 0) === 0
                  : (fixture.homeScore ?? 0) === 0
                : false),
          };

          const basePoints = this.computePlayerPoints(stats);

          await this.prisma.gameweekPoints.upsert({
            where: {
              entryId_playerId_fixtureId: {
                entryId: entry.id,
                playerId: slot.playerId,
                fixtureId: fixture.id,
              },
            },
            create: {
              entryId: entry.id,
              playerId: slot.playerId,
              fixtureId: fixture.id,
              basePoints,
              bonusPoints: 0,
              deductions: 0,
              total: basePoints,
            },
            update: {
              basePoints,
              total: basePoints,
            },
          });

          entryPoints += basePoints;
          playerPoints.set(
            slot.playerId,
            (playerPoints.get(slot.playerId) ?? 0) + basePoints,
          );
        }
      }

      const captainPoints = entry.captainId
        ? (playerPoints.get(entry.captainId) ?? 0)
        : 0;
      if (captainPoints > 0) {
        entryPoints += captainPoints;
      } else if (entry.viceCaptainId) {
        entryPoints += Math.floor(
          (playerPoints.get(entry.viceCaptainId) ?? 0) / 2,
        );
      }

      await this.prisma.gameweekEntry.update({
        where: { id: entry.id },
        data: { points: entryPoints, status: 'LOCKED' },
      });

      await this.prisma.fantasyTeam.update({
        where: { id: entry.teamId },
        data: { totalPoints: { increment: entryPoints } },
      });

      pointsByEntry[entry.id] = entryPoints;
      processed += 1;
    }

    await this.prisma.gameweek.update({
      where: { id: gameweekId },
      data: { status: 'FINISHED' },
    });

    return { gameweekId, processed, pointsByEntry };
  }
}