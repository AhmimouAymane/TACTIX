import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from '../../prisma/prisma.service';
import { AcceptInvitationDto, CreateLeagueDto, JoinLeagueDto } from './dto/leagues.dto';

const INVITATION_TTL_DAYS = 7;

@Injectable()
export class LeaguesService {
  constructor(private readonly prisma: PrismaService) {}

  private generateCode(): string {
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 8; i += 1) {
      code += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return code;
  }

  private async uniqueCode(): Promise<string> {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const code = this.generateCode();
      const existing = await this.prisma.league.findUnique({ where: { code } });
      if (!existing) return code;
    }
    throw new BadRequestException('Could not generate a unique league code');
  }

  async createLeague(userId: string, dto: CreateLeagueDto) {
    const code = await this.uniqueCode();

    return this.prisma.$transaction(async (tx) => {
      const league = await tx.league.create({
        data: {
          name: dto.name.trim(),
          code,
          ownerId: userId,
          capacity: dto.capacity ?? 100,
        },
      });
      await tx.leagueMember.create({
        data: { leagueId: league.id, userId, role: 'OWNER' },
      });
      return league;
    });
  }

  async listMyLeagues(userId: string) {
    const memberships = await this.prisma.leagueMember.findMany({
      where: { userId },
      orderBy: { joinedAt: 'desc' },
      include: {
        league: {
          include: {
            owner: { select: { id: true, displayName: true, username: true } },
            _count: { select: { members: true } },
          },
        },
      },
    });

    return memberships.map((membership) => ({
      role: membership.role,
      joinedAt: membership.joinedAt,
      ...membership.league,
    }));
  }

  async getLeague(userId: string, id: string) {
    const league = await this.prisma.league.findUnique({
      where: { id },
      include: {
        owner: { select: { id: true, displayName: true, username: true } },
        members: {
          include: {
            user: {
              select: { id: true, displayName: true, username: true },
            },
          },
          orderBy: { joinedAt: 'asc' },
        },
        _count: { select: { members: true } },
      },
    });

    if (!league) {
      throw new NotFoundException('League not found');
    }

    const membership = league.members.some(
      (member) => member.userId === userId,
    );
    if (!membership) {
      throw new ForbiddenException('You are not a member of this league');
    }

    return league;
  }

  async joinLeague(userId: string, dto: JoinLeagueDto) {
    const league = await this.prisma.league.findUnique({
      where: { code: dto.code.trim().toUpperCase() },
    });
    if (!league) {
      throw new NotFoundException('League not found');
    }

    const existing = await this.prisma.leagueMember.findUnique({
      where: { leagueId_userId: { leagueId: league.id, userId } },
    });
    if (existing) {
      throw new BadRequestException('Already a member of this league');
    }

    const memberCount = await this.prisma.leagueMember.count({
      where: { leagueId: league.id },
    });
    if (memberCount >= league.capacity) {
      throw new BadRequestException('League is full');
    }

    await this.prisma.leagueMember.create({
      data: { leagueId: league.id, userId },
    });

    return this.getLeague(userId, league.id);
  }

  async leaveLeague(userId: string, id: string) {
    const league = await this.prisma.league.findUnique({ where: { id } });
    if (!league) {
      throw new NotFoundException('League not found');
    }
    if (league.ownerId === userId) {
      throw new BadRequestException('League owner cannot leave');
    }

    await this.prisma.leagueMember.deleteMany({
      where: { leagueId: id, userId },
    });

    return { left: true };
  }

  async getStandings(userId: string, id: string) {
    await this.getLeague(userId, id);

    const competition = await this.prisma.competition.findFirst();
    if (!competition) {
      throw new NotFoundException('No active competition');
    }

    const members = await this.prisma.leagueMember.findMany({
      where: { leagueId: id },
      include: {
        user: {
          include: {
            fantasyTeams: {
              where: { seasonId: competition.id },
              select: { name: true, totalPoints: true },
            },
          },
        },
      },
    });

    const rows = members
      .map((member) => {
        const team = member.user.fantasyTeams[0];
        return {
          userId: member.user.id,
          displayName: member.user.displayName ?? member.user.username,
          teamName: team?.name ?? null,
          totalPoints: team?.totalPoints ?? 0,
          hasTeam: team != null,
        };
      })
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .map((row, index) => ({ ...row, rank: index + 1 }));

    return { leagueId: id, standings: rows };
  }

  async createInvitation(
    userId: string,
    leagueId: string,
    targetUserId: string,
  ) {
    const league = await this.prisma.league.findUnique({
      where: { id: leagueId },
    });
    if (!league) {
      throw new NotFoundException('League not found');
    }
    if (league.ownerId !== userId) {
      throw new ForbiddenException('Only the league owner can invite');
    }

    const target = await this.prisma.user.findUnique({
      where: { id: targetUserId },
    });
    if (!target) {
      throw new NotFoundException('User not found');
    }

    const alreadyMember = await this.prisma.leagueMember.findUnique({
      where: { leagueId_userId: { leagueId, userId: targetUserId } },
    });
    if (alreadyMember) {
      throw new BadRequestException('User is already a member of this league');
    }

    const token = randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + INVITATION_TTL_DAYS);

    const invitation = await this.prisma.leagueInvitation.create({
      data: { leagueId, userId: targetUserId, token, expiresAt },
    });

    return invitation;
  }

  async acceptInvitation(userId: string, dto: AcceptInvitationDto) {
    const invitation = await this.prisma.leagueInvitation.findUnique({
      where: { id: dto.invitationId },
      include: { league: true },
    });
    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }
    if (invitation.userId !== userId) {
      throw new ForbiddenException('Invitation belongs to another user');
    }
    if (invitation.expiresAt < new Date()) {
      throw new BadRequestException('Invitation has expired');
    }
    if (invitation.status !== 'PENDING') {
      throw new BadRequestException('Invitation is no longer pending');
    }

    const existing = await this.prisma.leagueMember.findUnique({
      where: { leagueId_userId: { leagueId: invitation.leagueId, userId } },
    });
    if (existing) {
      throw new BadRequestException('Already a member of this league');
    }

    await this.prisma.$transaction([
      this.prisma.leagueMember.create({
        data: { leagueId: invitation.leagueId, userId },
      }),
      this.prisma.leagueInvitation.update({
        where: { id: invitation.id },
        data: { status: 'ACCEPTED' },
      }),
    ]);

    return this.getLeague(userId, invitation.leagueId);
  }
}