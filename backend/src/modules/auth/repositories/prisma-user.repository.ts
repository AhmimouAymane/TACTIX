import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { UserEntity, UserRole } from '../entities/user.entity';
import {
  CreateUserInput,
  UserRepository,
} from '../interfaces/user-repository.interface';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateUserInput): Promise<UserEntity> {
    const row = await this.prisma.user.create({
      data: {
        email: input.email.trim().toLowerCase(),
        username: input.username,
        displayName: input.displayName,
        passwordHash: input.passwordHash,
        role: this.mapRole(input.role ?? 'USER'),
        status: 'ACTIVE',
      },
    });
    return this.toEntity(row);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const row = await this.prisma.user.findFirst({
      where: { email: email.trim().toLowerCase() },
    });
    return row ? this.toEntity(row) : null;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const row = await this.prisma.user.findUnique({ where: { id } });
    return row ? this.toEntity(row) : null;
  }

  async updatePassword(id: string, passwordHash: string): Promise<UserEntity> {
    const row = await this.prisma.user.update({
      where: { id },
      data: { passwordHash },
    });
    return this.toEntity(row);
  }

  async setMfa(
    id: string,
    enabled: boolean,
    secret: string | null,
  ): Promise<UserEntity> {
    const row = await this.prisma.user.update({
      where: { id },
      data: { mfaEnabled: enabled, mfaSecret: secret },
    });
    return this.toEntity(row);
  }

  private mapRole(role: UserRole) {
    return role === 'MODERATOR' ? 'ADMIN' : role;
  }

  private toEntity(row: {
    id: string;
    email: string;
    username: string;
    displayName: string | null;
    passwordHash: string;
    role: string;
    status: string;
    mfaEnabled: boolean;
    mfaSecret: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): UserEntity {
    return new UserEntity({
      id: row.id,
      email: row.email,
      username: row.username,
      displayName: row.displayName,
      passwordHash: row.passwordHash,
      role: row.role as UserRole,
      status: row.status as UserEntity['status'],
      mfaEnabled: row.mfaEnabled,
      mfaSecret: row.mfaSecret,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }
}