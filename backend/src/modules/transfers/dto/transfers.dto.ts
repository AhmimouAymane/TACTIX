import { IsUUID } from 'class-validator';

export class MakeTransferDto {
  @IsUUID()
  playerOutId!: string;

  @IsUUID()
  playerInId!: string;
}