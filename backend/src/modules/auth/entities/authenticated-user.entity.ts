import { UserRole } from './user.entity';

export class AuthenticatedUserEntity {
  constructor(
    readonly userId: string,
    readonly email: string,
    readonly username: string,
    readonly role: UserRole,
    readonly tokenId?: string,
  ) {}
}
