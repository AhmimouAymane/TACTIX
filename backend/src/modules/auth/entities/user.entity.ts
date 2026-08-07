export type UserRole = 'USER' | 'ADMIN' | 'MODERATOR';
export type UserStatus = 'ACTIVE' | 'BANNED' | 'VERIFICATION_PENDING';

export interface PublicUserView {
  id: string;
  email: string;
  username: string;
  display_name: string | null;
  role: UserRole;
  status: UserStatus;
  mfa_enabled: boolean;
  created_at: string;
}

export class UserEntity {
  readonly id: string;
  readonly email: string;
  readonly username: string;
  readonly displayName: string | null;
  readonly passwordHash: string;
  readonly role: UserRole;
  readonly status: UserStatus;
  readonly mfaEnabled: boolean;
  readonly mfaSecret: string | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(input: {
    id: string;
    email: string;
    username: string;
    displayName: string | null;
    passwordHash: string;
    role: UserRole;
    status: UserStatus;
    mfaEnabled: boolean;
    mfaSecret: string | null;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = input.id;
    this.email = input.email;
    this.username = input.username;
    this.displayName = input.displayName;
    this.passwordHash = input.passwordHash;
    this.role = input.role;
    this.status = input.status;
    this.mfaEnabled = input.mfaEnabled;
    this.mfaSecret = input.mfaSecret;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
  }

  toPublicView(): PublicUserView {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      display_name: this.displayName,
      role: this.role,
      status: this.status,
      mfa_enabled: this.mfaEnabled,
      created_at: this.createdAt.toISOString(),
    };
  }
}
