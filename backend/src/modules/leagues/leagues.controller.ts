import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedUserEntity } from '../auth/entities/authenticated-user.entity';
import { LeaguesService } from './leagues.service';
import {
  AcceptInvitationDto,
  CreateInvitationDto,
  CreateLeagueDto,
  JoinLeagueDto,
} from './dto/leagues.dto';

@ApiTags('leagues')
@UseGuards(JwtAuthGuard)
@Controller('leagues')
export class LeaguesController {
  constructor(private readonly leaguesService: LeaguesService) {}

  @Get()
  listMy(@CurrentUser() identity: AuthenticatedUserEntity) {
    return this.leaguesService.listMyLeagues(identity.userId);
  }

  @Post()
  create(
    @CurrentUser() identity: AuthenticatedUserEntity,
    @Body() dto: CreateLeagueDto,
  ) {
    return this.leaguesService.createLeague(identity.userId, dto);
  }

  @Post('join')
  join(
    @CurrentUser() identity: AuthenticatedUserEntity,
    @Body() dto: JoinLeagueDto,
  ) {
    return this.leaguesService.joinLeague(identity.userId, dto);
  }

  @Get(':id/standings')
  standings(
    @CurrentUser() identity: AuthenticatedUserEntity,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.leaguesService.getStandings(identity.userId, id);
  }

  @Post(':id/invitations')
  createInvitation(
    @CurrentUser() identity: AuthenticatedUserEntity,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateInvitationDto,
  ) {
    return this.leaguesService.createInvitation(
      identity.userId,
      id,
      dto.userId,
    );
  }

  @Get(':id')
  getOne(
    @CurrentUser() identity: AuthenticatedUserEntity,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.leaguesService.getLeague(identity.userId, id);
  }

  @Delete(':id/membership')
  leave(
    @CurrentUser() identity: AuthenticatedUserEntity,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.leaguesService.leaveLeague(identity.userId, id);
  }
}

@ApiTags('leagues')
@UseGuards(JwtAuthGuard)
@Controller('leagues/invitations')
export class LeagueInvitationsController {
  constructor(private readonly leaguesService: LeaguesService) {}

  @Post('accept')
  accept(
    @CurrentUser() identity: AuthenticatedUserEntity,
    @Body() dto: AcceptInvitationDto,
  ) {
    return this.leaguesService.acceptInvitation(identity.userId, dto);
  }
}