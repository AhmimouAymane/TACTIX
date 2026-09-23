import { Module } from '@nestjs/common';
import { LeagueInvitationsController, LeaguesController } from './leagues.controller';
import { LeaguesService } from './leagues.service';

@Module({
  controllers: [LeaguesController, LeagueInvitationsController],
  providers: [LeaguesService],
})
export class LeaguesModule {}