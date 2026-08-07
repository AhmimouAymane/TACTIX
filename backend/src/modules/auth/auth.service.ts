import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DomainException } from '@/common/errors/domain.exception';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ConfirmMfaDto } from './dto/confirm-mfa.dto';
import { VerifyMfaDto } from './dto/verify-mfa.dto';
import { AuthenticatedUserEntity } from './entities/authenticated-user.entity';
import { AuthTokenPairEntity } from './entities/auth-token-pair.entity';
import { PublicUserView } from './entities/user.entity';
import { MfaEnrollmentEntity } from './entities/mfa-enrollment.entity';
import { USER_REPOSITORY, UserRepository } from './interfaces/user-repository.interface';
import { PasswordService } from './password.service';
import { TokenService } from './token.service';
import { MfaService } from './mfa.service';

export interface RegisterResult {
  user: PublicUserView;
  tokens: AuthTokenPairEntity;
}

export interface LoginResult {
  user: PublicUserView;
  requires_mfa: boolean;
  tokens?: AuthTokenPairEntity;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    private readonly password: PasswordService,
    private readonly token: TokenService,
    private readonly mfa: MfaService,
  ) {}

  async register(dto: RegisterDto): Promise<RegisterResult> {
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) {
      throw new DomainException(
        'DUPLICATE_ENTRY',
        'Email already registered',
        HttpStatus.CONFLICT,
      );
    }

    const passwordHash = await this.password.hash(dto.password);
    const user = await this.userRepository.create({
      email: dto.email.trim().toLowerCase(),
      username: dto.username,
      displayName: dto.display_name ?? null,
      passwordHash,
    });

    const tokens = await this.token.issueTokenPair(user);
    return { user: user.toPublicView(), tokens };
  }

  async login(dto: LoginDto): Promise<LoginResult> {
    const user = await this.userRepository.findByEmail(dto.email);
    const valid = user !== null && (await this.password.compare(dto.password, user.passwordHash));

    if (!user || !valid) {
      throw new DomainException(
        'UNAUTHORIZED',
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (user.mfaEnabled) {
      return { user: user.toPublicView(), requires_mfa: true };
    }

    const tokens = await this.token.issueTokenPair(user);
    return { user: user.toPublicView(), requires_mfa: false, tokens };
  }

  async refresh(
    identity: AuthenticatedUserEntity,
    refreshToken: string,
  ): Promise<RegisterResult> {
    const record = await this.token.findRefreshToken(refreshToken);
    if (!record || record.userId !== identity.userId) {
      throw new DomainException(
        'UNAUTHORIZED',
        'Invalid or expired refresh token',
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.token.revokeRefreshToken(refreshToken);

    const user = await this.userRepository.findById(identity.userId);
    if (!user) {
      throw new DomainException('NOT_FOUND', 'User not found', HttpStatus.NOT_FOUND);
    }

    const tokens = await this.token.issueTokenPair(user);
    return { user: user.toPublicView(), tokens };
  }

  async logout(identity: AuthenticatedUserEntity): Promise<void> {
    await this.token.revokeAllForUser(identity.userId);
  }

  async changePassword(
    identity: AuthenticatedUserEntity,
    dto: ChangePasswordDto,
  ): Promise<void> {
    const user = await this.userRepository.findById(identity.userId);
    if (!user) {
      throw new DomainException('NOT_FOUND', 'User not found', HttpStatus.NOT_FOUND);
    }

    const valid = await this.password.compare(dto.current_password, user.passwordHash);
    if (!valid) {
      throw new DomainException(
        'UNAUTHORIZED',
        'Current password is incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const passwordHash = await this.password.hash(dto.new_password);
    await this.userRepository.updatePassword(user.id, passwordHash);
    await this.token.revokeAllForUser(user.id);
  }

  async getSession(identity: AuthenticatedUserEntity): Promise<PublicUserView> {
    const user = await this.userRepository.findById(identity.userId);
    if (!user) {
      throw new DomainException('NOT_FOUND', 'User not found', HttpStatus.NOT_FOUND);
    }
    return user.toPublicView();
  }

  async mfaEnroll(identity: AuthenticatedUserEntity): Promise<MfaEnrollmentEntity> {
    const secret = this.mfa.generateSecret();
    const user = await this.userRepository.findById(identity.userId);
    if (!user) {
      throw new DomainException('NOT_FOUND', 'User not found', HttpStatus.NOT_FOUND);
    }
    return this.mfa.createEnrollment(user.email, secret);
  }

  async mfaConfirm(identity: AuthenticatedUserEntity, dto: ConfirmMfaDto): Promise<void> {
    return this.enableMfa(identity, dto);
  }

  async enableMfa(identity: AuthenticatedUserEntity, dto: ConfirmMfaDto): Promise<void> {
    const user = await this.userRepository.findById(identity.userId);
    if (!user) {
      throw new DomainException('NOT_FOUND', 'User not found', HttpStatus.NOT_FOUND);
    }

    const valid = await this.mfa.verifyToken(dto.secret, dto.code);
    if (!valid) {
      throw new DomainException(
        'MFA_INVALID_CODE',
        'Invalid MFA verification code',
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.userRepository.setMfa(user.id, true, dto.secret);
  }

  async verifyMfa(dto: VerifyMfaDto): Promise<LoginResult> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user || !user.mfaEnabled || !user.mfaSecret) {
      throw new DomainException(
        'MFA_REQUIRED',
        'MFA verification is required to continue',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const valid = await this.mfa.verifyToken(user.mfaSecret, dto.code);
    if (!valid) {
      throw new DomainException(
        'MFA_INVALID_CODE',
        'Invalid MFA code',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const tokens = await this.token.issueTokenPair(user);
    return { user: user.toPublicView(), requires_mfa: false, tokens };
  }
}