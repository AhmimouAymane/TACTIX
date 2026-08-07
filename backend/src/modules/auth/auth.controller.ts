import { Controller, Post, Get, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ConfirmMfaDto } from './dto/confirm-mfa.dto';
import { VerifyMfaDto } from './dto/verify-mfa.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthenticatedUserEntity } from './entities/authenticated-user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 409, description: 'Email already registered' })
  async register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  @Post('refresh')
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token using refresh token from body' })
  @ApiResponse({ status: 200, description: 'Token refreshed successfully' })
  @ApiResponse({ status: 401, description: 'Invalid or expired refresh token' })
  async refresh(
    @CurrentUser() identity: AuthenticatedUserEntity,
    @Body() dto: RefreshTokenDto,
  ) {
    return this.auth.refresh(identity, dto.refresh_token);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout and revoke all refresh tokens' })
  @ApiResponse({ status: 200, description: 'Logged out successfully' })
  async logout(@CurrentUser() identity: AuthenticatedUserEntity) {
    await this.auth.logout(identity);
    return { message: 'Logged out successfully' };
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change password' })
  @ApiResponse({ status: 200, description: 'Password changed successfully' })
  @ApiResponse({ status: 401, description: 'Current password is incorrect' })
  async changePassword(
    @CurrentUser() identity: AuthenticatedUserEntity,
    @Body() dto: ChangePasswordDto,
  ) {
    await this.auth.changePassword(identity, dto);
    return { message: 'Password changed successfully' };
  }

  @Get('session')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current session user info' })
  @ApiResponse({ status: 200, description: 'Session info' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async session(@CurrentUser() identity: AuthenticatedUserEntity) {
    return this.auth.getSession(identity);
  }

  @Post('mfa/enroll')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Enroll in MFA (TOTP)' })
  @ApiResponse({ status: 200, description: 'MFA enrollment data' })
  async mfaEnroll(@CurrentUser() identity: AuthenticatedUserEntity) {
    return this.auth.mfaEnroll(identity);
  }

  @Post('mfa/confirm')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Confirm MFA enrollment' })
  @ApiResponse({ status: 200, description: 'MFA enabled' })
  @ApiResponse({ status: 401, description: 'Invalid MFA code' })
  async mfaConfirm(
    @CurrentUser() identity: AuthenticatedUserEntity,
    @Body() dto: ConfirmMfaDto,
  ) {
    await this.auth.enableMfa(identity, dto);
    return { message: 'MFA enabled successfully' };
  }

  @Post('mfa/verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Complete MFA login with TOTP code' })
  @ApiResponse({ status: 200, description: 'MFA verified, tokens issued' })
  @ApiResponse({ status: 401, description: 'Invalid MFA code' })
  async mfaVerify(@Body() dto: VerifyMfaDto) {
    return this.auth.verifyMfa(dto);
  }
}