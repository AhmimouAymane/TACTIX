import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { AuthModule } from '../src/modules/auth/auth.module';
import { PlayersModule } from '../src/modules/players/players.module';
import { ClubsModule } from '../src/modules/clubs/clubs.module';
import { FixturesModule } from '../src/modules/fixtures/fixtures.module';
import { GameweeksModule } from '../src/modules/gameweeks/gameweeks.module';
import { TeamsModule } from '../src/modules/teams/teams.module';
import { TransfersModule } from '../src/modules/transfers/transfers.module';
import { ScoringModule } from '../src/modules/scoring/scoring.module';
import { LeaguesModule } from '../src/modules/leagues/leagues.module';
import { RankingsModule } from '../src/modules/rankings/rankings.module';
import { NewsModule } from '../src/modules/news/news.module';
import { NotificationsModule } from '../src/modules/notifications/notifications.module';
import { AdminModule } from '../src/modules/admin/admin.module';

describe('AppModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  afterAll(async () => {
    await module.close();
  });

  it('should compile the app module', () => {
    expect(module).toBeDefined();
  });

  it('should have all required modules registered', () => {
    const modules = [
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
    ];

    modules.forEach((mod) => {
      const selected = module.select(mod);
      expect(selected).toBeDefined();
    });
  });
});
