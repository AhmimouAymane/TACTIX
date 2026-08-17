import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PlayerPosition } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  Min,
} from 'class-validator';
import { ScoringService } from './scoring.service';

class ComputePointsDto {
  @IsEnum(PlayerPosition)
  position!: PlayerPosition;

  @IsBoolean()
  @IsOptional()
  appeared?: boolean;

  @IsInt()
  @Min(0)
  @IsOptional()
  goals?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  assists?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  saves?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  penaltySaved?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  penaltyMissed?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  ownGoals?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  yellowCards?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  redCards?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  goalsConceded?: number;

  @IsBoolean()
  @IsOptional()
  cleanSheet?: boolean;
}

@ApiTags('scoring')
@Controller('scoring')
export class ScoringController {
  constructor(private readonly scoringService: ScoringService) {}

  @Post('compute')
  compute(@Body() dto: ComputePointsDto): { points: number } {
    return {
      points: this.scoringService.computePlayerPoints({
        position: dto.position,
        appeared: dto.appeared ?? false,
        goals: dto.goals ?? 0,
        assists: dto.assists ?? 0,
        saves: dto.saves ?? 0,
        penaltySaved: dto.penaltySaved ?? 0,
        penaltyMissed: dto.penaltyMissed ?? 0,
        ownGoals: dto.ownGoals ?? 0,
        yellowCards: dto.yellowCards ?? 0,
        redCards: dto.redCards ?? 0,
        goalsConceded: dto.goalsConceded ?? 0,
        cleanSheet: dto.cleanSheet ?? false,
      }),
    };
  }
}