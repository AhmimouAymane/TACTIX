import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { DomainException } from '../../../common/errors/domain.exception';
import { UserEntity } from '../entities/user.entity';
import { CreateUserInput, UserRepository } from '../interfaces/user-repository.interface';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private readonly users = new Map<string, UserEntity>();

  async create(input: CreateUserInput): Promise<UserEntity> {
    const now = new Date();
    const user = new UserEntity({
      id: randomUUID(),
      email: input.email,
      username: input.username,
      displayName: input.displayName,
      passwordHash: input.passwordHash,
      role: input.role ?? 'USER',
      status: 'ACTIVE',
      mfaEnabled: false,
      mfaSecret: null,
      createdAt: now,
      updatedAt: now,
    });
    this.users.set(user.id, user);
    return user;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const normalized = email.trim().toLowerCase();
    for (const user of this.users.values()) {
      if (user.email.toLowerCase() === normalized) return user;
    }
    return null;
  }

  async findById(id: string): Promise<UserEntity | null> {
    return this.users.get(id) ?? null;
  }

  async updatePassword(id: string, passwordHash: string): Promise<UserEntity> {
    const current = this.users.get(id);
    if (!current) {
      throw new DomainException('NOT_FOUND', 'User not found', 404);
    }
    const updated = new UserEntity({
      ...current,
      passwordHash,
      updatedAt: new Date(),
    });
    this.users.set(id, updated);
    return updated;
  }

  async setMfa(id: string, enabled: boolean, secret: string | null): Promise<UserEntity> {
    const current = this.users.get(id);
    if (!current) {
      throw new DomainException('NOT_FOUND', 'User not found', 404);
    }
    const updated = new UserEntity({
      ...current,
      mfaEnabled: enabled,
      mfaSecret: secret,
      updatedAt: new Date(),
    });
    this.users.set(id, updated);
    return updated;
  }
}
