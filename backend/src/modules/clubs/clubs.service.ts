import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ClubsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.club.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: {
            players: {
              where: { status: 'ACTIVE' },
            },
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const club = await this.prisma.club.findUnique({
      where: { id },
      include: {
        players: {
          orderBy: [{ position: 'asc' }, { currentPrice: 'desc' }],
        },
      },
    });

    if (!club) {
      throw new NotFoundException('Club not found');
    }

    return club;
  }
}