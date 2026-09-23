import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateLeagueDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  name!: string;

  @IsOptional()
  @IsInt()
  @Min(2)
  @Max(200)
  capacity?: number;
}

export class JoinLeagueDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  code!: string;
}

export class AcceptInvitationDto {
  @IsUUID()
  invitationId!: string;
}

export class CreateInvitationDto {
  @IsUUID()
  userId!: string;
}