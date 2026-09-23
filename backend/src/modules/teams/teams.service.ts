import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SquadSlotPosition } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateSquadDto, UpdateSquadSlotDto } from './dto/teams.dto';

const MAX_SQUAD_SIZE = 15;
const STARTING_BUDGET = 100;

const SLOT_POSITION_PREFIX: Record<SquadSlotPosition, string> = {
  GK1: 'GK',
  GK2: 'GK',
  DEF1: 'DEF',
  DEF2: 'DEF',
  DEF3: 'DEF',
  DEF4: 'DEF',
  DEF5: 'DEF',
  MID1: 'MID',
  MID2: 'MID',
  MID3: 'MID',
  MID4: 'MID',
  MID5: 'MID',
  FWD1: 'FWD',
  FWD2: 'FWD',
  FWD3: 'FWD',
  SUB1: 'SUB',
  SUB2: 'SUB',
  SUB3: 'SUB',
  SUB4: 'SUB',
};

@Injectable()
export class TeamsService {
  constructor(private readonly prisma: PrismaService) {}

  private async currentCompetition() {
    const competition = await this.prisma.competition.findFirst();
    if (!competition) {
      throw new NotFoundException('No active competition');
    }
    return competition;
  }

  async createTeam(userId: string, name: string) {
    const competition = await this.currentCompetition();

    const existing = await this.prisma.fantasyTeam.findUnique({
      where: { userId_seasonId: { userId, seasonId: competition.id } },
    });
    if (existing) {
      throw new BadRequestException('Team already exists for this season');
    }

    return this.prisma.fantasyTeam.create({
      data: {
        userId,
        seasonId: competition.id,
        name: name.trim(),
      },
      include: { squadSlots: true },
    });
  }

  async getMyTeam(userId: string) {
    const competition = await this.currentCompetition();

    const team = await this.prisma.fantasyTeam.findUnique({
      where: { userId_seasonId: { userId, seasonId: competition.id } },
      include: {
        squadSlots: {
          include: { player: { include: { club: true } } },
        },
      },
    });

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    return team;
  }

  async updateSquad(userId: string, dto: UpdateSquadDto) {
    const team = await this.getMyTeam(userId);
    const slots = dto.slots;

    if (slots.length > MAX_SQUAD_SIZE) {
      throw new BadRequestException(
        `Squad cannot exceed ${MAX_SQUAD_SIZE} players`,
      );
    }

    this.validateSlots(slots);

    const playerIds = slots.map((slot) => slot.playerId);
    const players = await this.prisma.player.findMany({
      where: { id: { in: playerIds } },
    });
    if (players.length !== playerIds.length) {
      throw new NotFoundException('One or more players not found');
    }
    const playerById = new Map(players.map((player) => [player.id, player]));

    for (const slot of slots) {
      const player = playerById.get(slot.playerId)!;
      const prefix = SLOT_POSITION_PREFIX[slot.position];
      const allowed = prefix === 'SUB' || player.position === prefix;
      if (!allowed) {
        throw new BadRequestException(
          `Player ${player.lastName} cannot play at ${slot.position}`,
        );
      }
    }

    const totalValue = slots.reduce(
      (sum, slot) => sum + Number(playerById.get(slot.playerId)!.currentPrice),
      0,
    );
    if (totalValue > STARTING_BUDGET) {
      throw new BadRequestException(
        `Squad value ${totalValue} exceeds budget of ${STARTING_BUDGET}`,
      );
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.squadSlot.deleteMany({ where: { teamId: team.id } });
      if (slots.length > 0) {
        await tx.squadSlot.createMany({
          data: slots.map((slot) => ({
            teamId: team.id,
            playerId: slot.playerId,
            position: slot.position,
            isCaptain: slot.isCaptain ?? false,
            isViceCaptain: slot.isViceCaptain ?? false,
            purchasedPrice: playerById.get(slot.playerId)!.currentPrice,
          })),
        });
      }
      await tx.fantasyTeam.update({
        where: { id: team.id },
        data: {
          value: totalValue,
          budgetRemaining: STARTING_BUDGET - totalValue,
        },
      });
    });

    return this.getMyTeam(userId);
  }

  async getTeam(id: string) {
    const team = await this.prisma.fantasyTeam.findUnique({
      where: { id },
      include: {
        squadSlots: {
          include: { player: { include: { club: true } } },
        },
      },
    });

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    return team;
  }

  private validateSlots(slots: UpdateSquadSlotDto[]) {
    const playerIds = new Set<string>();
    const positions = new Set<SquadSlotPosition>();
    let captains = 0;
    let viceCaptains = 0;

    for (const slot of slots) {
      if (playerIds.has(slot.playerId)) {
        throw new BadRequestException('Duplicate player in squad');
      }
      if (positions.has(slot.position)) {
        throw new BadRequestException(
          `Position ${slot.position} already used`,
        );
      }
      playerIds.add(slot.playerId);
      positions.add(slot.position);
      if (slot.isCaptain) captains += 1;
      if (slot.isViceCaptain) viceCaptains += 1;
    }

    if (captains > 1) {
      throw new BadRequestException('Only one captain allowed');
    }
    if (viceCaptains > 1) {
      throw new BadRequestException('Only one vice captain allowed');
    }
  }
}