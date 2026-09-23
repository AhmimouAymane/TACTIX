import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class SyncQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  seasonId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  round?: number;

  @IsOptional()
  @IsString()
  stage?: string;
}
