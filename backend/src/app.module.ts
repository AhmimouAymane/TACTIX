import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { PlayersModule } from './modules/players/players.module';
import { ClubsModule } from './modules/clubs/clubs.module';
import { FixturesModule } from './modules/fixtures/fixtures.module';
import { GameweeksModule } from './modules/gameweeks/gameweeks.module';
import { TeamsModule } from './modules/teams/teams.module';
import { TransfersModule } from './modules/transfers/transfers.module';
import { ScoringModule } from './modules/scoring/scoring.module';
import { LeaguesModule } from './modules/leagues/leagues.module';
import { RankingsModule } from './modules/rankings/rankings.module';
import { NewsModule } from './modules/news/news.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AdminModule } from './modules/admin/admin.module';
import { BsdModule } from './modules/integrations/bsd/bsd.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    PlayersModule,
    ClubsModule,
    FixturesModule,
    GameweeksModule,
    TeamsModule,
    TransfersModule,
    ScoringModule,
    LeaguesModule,
    RankingsModule,
    NewsModule,
    NotificationsModule,
    AdminModule,
    BsdModule,
  ],
})
export class AppModule {}
