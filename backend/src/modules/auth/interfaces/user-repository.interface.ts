import { UserEntity, UserRole } from '../entities/user.entity';

export interface CreateUserInput {
  email: string;
  username: string;
  displayName: string | null;
  passwordHash: string;
  role?: UserRole;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface UserRepository {
  create(input: CreateUserInput): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
  updatePassword(id: string, passwordHash: string): Promise<UserEntity>;
  setMfa(id: string, enabled: boolean, secret: string | null): Promise<UserEntity>;
}
