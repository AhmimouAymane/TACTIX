import { SquadSlotPosition } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  name!: string;
}

export class UpdateSquadSlotDto {
  @IsUUID()
  playerId!: string;

  @IsEnum(SquadSlotPosition)
  position!: SquadSlotPosition;

  @IsBoolean()
  @IsOptional()
  isCaptain?: boolean;

  @IsBoolean()
  @IsOptional()
  isViceCaptain?: boolean;
}

export class UpdateSquadDto {
  @IsNotEmpty()
  slots!: UpdateSquadSlotDto[];
}