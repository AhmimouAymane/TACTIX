import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PasswordService {
  constructor(private readonly config: ConfigService) {}

  private getRounds(): number {
    const rounds = this.config.get<string>('BCRYPT_ROUNDS') ?? '12';
    return parseInt(rounds, 10);
  }

  async hash(password: string): Promise<string> {
    const rounds = this.getRounds();
    return bcrypt.hash(password, rounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}