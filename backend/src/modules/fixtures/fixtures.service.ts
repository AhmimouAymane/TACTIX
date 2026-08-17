import { Injectable, NotFoundException } from '@nestjs/common';
import { FixtureStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

export interface FixtureListQuery {
  gameweekId?: string;
  status?: FixtureStatus;
  competitionId?: string;
}

@Injectable()
export class FixturesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: FixtureListQuery) {
    const where = {
      ...(query.gameweekId ? { gameweekId: query.gameweekId } : {}),
      ...(query.status ? { status: query.status } : {}),
      ...(query.competitionId ? { competitionId: query.competitionId } : {}),
    };

    return this.prisma.fixture.findMany({
      where,
      orderBy: { kickoffAt: 'asc' },
      include: {
        competition: { select: { id: true, name: true, code: true } },
        gameweek: { select: { id: true, number: true, status: true } },
        homeClub: { select: { id: true, name: true, shortName: true, crestUrl: true } },
        awayClub: { select: { id: true, name: true, shortName: true, crestUrl: true } },
      },
    });
  }

  async findOne(id: string) {
    const fixture = await this.prisma.fixture.findUnique({
      where: { id },
      include: {
        competition: true,
        gameweek: true,
        homeClub: true,
        awayClub: true,
        matchEvents: {
          orderBy: [{ sequence: 'asc' }, { minute: 'asc' }],
          include: { player: true },
        },
      },
    });

    if (!fixture) {
      throw new NotFoundException('Fixture not found');
    }

    return fixture;
  }
}