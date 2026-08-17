import { Injectable, NotFoundException } from '@nestjs/common';
import { PlayerPosition, PlayerStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

export interface PlayerListQuery {
  position?: PlayerPosition;
  clubId?: string;
  status?: PlayerStatus;
  search?: string;
  page?: number;
  limit?: number;
}

@Injectable()
export class PlayersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: PlayerListQuery) {
    const page = Math.max(query.page ?? 1, 1);
    const limit = Math.min(Math.max(query.limit ?? 20, 1), 100);

    const where = {
      ...(query.position ? { position: query.position } : {}),
      ...(query.clubId ? { clubId: query.clubId } : {}),
      ...(query.status ? { status: query.status } : {}),
      ...(query.search
        ? {
            OR: [
              { firstName: { contains: query.search, mode: 'insensitive' as const } },
              { lastName: { contains: query.search, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    };

    const [items, total] = await Promise.all([
      this.prisma.player.findMany({
        where,
        orderBy: [{ position: 'asc' }, { currentPrice: 'desc' }],
        skip: (page - 1) * limit,
        take: limit,
        include: { club: true },
      }),
      this.prisma.player.count({ where }),
    ]);

    return { items, total, page, limit };
  }

  async findOne(id: string) {
    const player = await this.prisma.player.findUnique({
      where: { id },
      include: {
        club: true,
        priceHistory: {
          orderBy: { effectiveAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!player) {
      throw new NotFoundException('Player not found');
    }

    return player;
  }
}