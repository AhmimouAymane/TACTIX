import { IsString, Matches } from 'class-validator';

export class ConfirmMfaDto {
  @IsString()
  @Matches(/^[A-Z2-7]{16,64}$/)
  secret!: string;

  @IsString()
  @Matches(/^\d{6}$/)
  code!: string;
}
