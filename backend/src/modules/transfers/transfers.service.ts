import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MakeTransferDto } from './dto/transfers.dto';

const FREE_TRANSFERS = 1;
const COST_PER_EXTRA_TRANSFER = 4;

@Injectable()
export class TransfersService {
  constructor(private readonly prisma: PrismaService) {}

  async listTransfers(userId: string) {
    const team = await this.prisma.fantasyTeam.findFirst({
      where: { userId },
    });
    if (!team) {
      throw new NotFoundException('Team not found');
    }

    return this.prisma.transfer.findMany({
      where: { teamId: team.id },
      orderBy: { createdAt: 'desc' },
      include: {
        gameweek: { select: { id: true, number: true, status: true } },
        playerOut: true,
        playerIn: true,
      },
    });
  }

  async getTransferStats(userId: string) {
    const team = await this.prisma.fantasyTeam.findFirst({
      where: { userId },
    });
    if (!team) {
      throw new NotFoundException('Team not found');
    }

    const gameweek = await this.prisma.gameweek.findFirst({
      where: { status: 'OPEN' },
      orderBy: { number: 'asc' },
    });

    const transfersMade = gameweek
      ? await this.prisma.transfer.count({
          where: { teamId: team.id, gameweekId: gameweek.id },
        })
      : 0;

    return {
      gameweek: gameweek
        ? { id: gameweek.id, number: gameweek.number }
        : null,
      transfersMade,
      freeTransfers: FREE_TRANSFERS,
      costPerExtraTransfer: COST_PER_EXTRA_TRANSFER,
      nextTransferCost:
        transfersMade < FREE_TRANSFERS
          ? 0
          : (transfersMade + 1 - FREE_TRANSFERS) * COST_PER_EXTRA_TRANSFER,
    };
  }

  async makeTransfer(userId: string, dto: MakeTransferDto) {
    const team = await this.prisma.fantasyTeam.findFirst({
      where: { userId },
    });
    if (!team) {
      throw new NotFoundException('Team not found');
    }

    const gameweek = await this.prisma.gameweek.findFirst({
      where: { status: 'OPEN' },
      orderBy: { number: 'asc' },
    });
    if (!gameweek) {
      throw new BadRequestException('No open gameweek for transfers');
    }

    const [playerOut, playerIn] = await Promise.all([
      this.prisma.player.findUnique({ where: { id: dto.playerOutId } }),
      this.prisma.player.findUnique({ where: { id: dto.playerInId } }),
    ]);
    if (!playerOut) {
      throw new NotFoundException('Player out not found');
    }
    if (!playerIn) {
      throw new NotFoundException('Player in not found');
    }

    const slots = await this.prisma.squadSlot.findMany({
      where: { teamId: team.id },
    });
    const outSlot = slots.find((slot) => slot.playerId === dto.playerOutId);
    if (!outSlot) {
      throw new BadRequestException('Player out is not in the squad');
    }
    if (slots.some((slot) => slot.playerId === dto.playerInId)) {
      throw new BadRequestException('Player in is already in the squad');
    }

    const outPrice = Number(outSlot.purchasedPrice);
    const inPrice = Number(playerIn.currentPrice);
    if (Number(team.budgetRemaining) + outPrice < inPrice) {
      throw new BadRequestException(
        'Insufficient budget for this transfer',
      );
    }

    const transfersMade = await this.prisma.transfer.count({
      where: { teamId: team.id, gameweekId: gameweek.id },
    });
    const cost = Math.max(
      0,
      (transfersMade - FREE_TRANSFERS + 1) * COST_PER_EXTRA_TRANSFER,
    );
    const priceDelta = inPrice - outPrice;

    const result = await this.prisma.$transaction(async (tx) => {
      const transfer = await tx.transfer.create({
        data: {
          teamId: team.id,
          gameweekId: gameweek.id,
          playerOutId: dto.playerOutId,
          playerInId: dto.playerInId,
          cost,
          priceDelta,
        },
      });

      await tx.squadSlot.update({
        where: {
          teamId_playerId: {
            teamId: team.id,
            playerId: dto.playerOutId,
          },
        },
        data: {
          playerId: dto.playerInId,
          purchasedPrice: inPrice,
        },
      });

      await tx.fantasyTeam.update({
        where: { id: team.id },
        data: {
          budgetRemaining: { increment: -priceDelta },
          value: { increment: priceDelta },
        },
      });

      await tx.gameweekEntry.updateMany({
        where: { teamId: team.id, gameweekId: gameweek.id, status: 'DRAFT' },
        data: {
          transfersMade: { increment: 1 },
          penaltyPoints: { increment: cost },
        },
      });

      return transfer;
    });

    return {
      transfer: result,
      cost,
      priceDelta,
      budgetRemaining: Number(team.budgetRemaining) - priceDelta,
    };
  }
}