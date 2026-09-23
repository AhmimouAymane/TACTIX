import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedUserEntity } from '../auth/entities/authenticated-user.entity';
import { TeamsService } from './teams.service';
import { CreateTeamDto, UpdateSquadDto } from './dto/teams.dto';

@ApiTags('teams')
@UseGuards(JwtAuthGuard)
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get('my')
  getMyTeam(@CurrentUser() identity: AuthenticatedUserEntity) {
    return this.teamsService.getMyTeam(identity.userId);
  }

  @Post()
  createTeam(
    @CurrentUser() identity: AuthenticatedUserEntity,
    @Body() dto: CreateTeamDto,
  ) {
    return this.teamsService.createTeam(identity.userId, dto.name);
  }

  @Put('my/squad')
  updateSquad(
    @CurrentUser() identity: AuthenticatedUserEntity,
    @Body() dto: UpdateSquadDto,
  ) {
    return this.teamsService.updateSquad(identity.userId, dto);
  }

  @Get(':id')
  getTeam(@Param('id', ParseUUIDPipe) id: string) {
    return this.teamsService.getTeam(id);
  }
}