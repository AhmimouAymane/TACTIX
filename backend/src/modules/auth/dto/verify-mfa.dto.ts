import { IsEmail, IsString, Matches } from 'class-validator';

export class VerifyMfaDto {
  @IsEmail()
  email!: string;

  @IsString()
  @Matches(/^\d{6}$/)
  code!: string;
}
