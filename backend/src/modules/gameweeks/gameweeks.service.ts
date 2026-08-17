import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ScoringService } from '../scoring/scoring.service';
import { GameweekStatus } from '@prisma/client';

@Injectable()
export class GameweeksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly scoringService: ScoringService,
  ) {}

  async findAll() {
    return this.prisma.gameweek.findMany({
      orderBy: { number: 'asc' },
      include: {
        competition: {
          select: { id: true, name: true, code: true },
        },
        _count: { select: { fixtures: true, entries: true } },
      },
    });
  }

  async findCurrent() {
    const gameweek = await this.prisma.gameweek.findFirst({
      where: {
        status: { in: [GameweekStatus.OPEN, GameweekStatus.LIVE] },
      },
      orderBy: { number: 'asc' },
      include: {
        fixtures: {
          orderBy: { kickoffAt: 'asc' },
          include: {
            homeClub: true,
            awayClub: true,
          },
        },
      },
    });

    if (!gameweek) {
      throw new NotFoundException('No current gameweek');
    }

    return gameweek;
  }

  async findOne(id: string) {
    const gameweek = await this.prisma.gameweek.findUnique({
      where: { id },
      include: {
        competition: true,
        fixtures: {
          orderBy: { kickoffAt: 'asc' },
          include: {
            homeClub: true,
            awayClub: true,
            matchEvents: {
              orderBy: [{ sequence: 'asc' }, { minute: 'asc' }],
              include: { player: true },
            },
          },
        },
      },
    });

    if (!gameweek) {
      throw new NotFoundException('Gameweek not found');
    }

    return gameweek;
  }

  async process(id: string) {
    return this.scoringService.processGameweek(id);
  }
}