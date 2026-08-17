import { Module } from '@nestjs/common';
import { ScoringModule } from '../scoring/scoring.module';
import { GameweeksController } from './gameweeks.controller';
import { GameweeksService } from './gameweeks.service';

@Module({
  imports: [ScoringModule],
  controllers: [GameweeksController],
  providers: [GameweeksService],
})
export class GameweeksModule {}