import { Injectable } from '@nestjs/common';
import { MfaEnrollmentEntity } from './entities/mfa-enrollment.entity';
import { generateSecret, generateURI, verify } from 'otplib';
import * as qrcode from 'qrcode';

@Injectable()
export class MfaService {
  private readonly issuer = 'TACTIX';

  generateSecret(): string {
    return generateSecret();
  }

  async createEnrollment(email: string, secret: string): Promise<MfaEnrollmentEntity> {
    const otpauthUrl = generateURI({
      issuer: this.issuer,
      label: email,
      secret,
    });
    const qrCodeDataUrl = await qrcode.toDataURL(otpauthUrl);
    return new MfaEnrollmentEntity(secret, otpauthUrl, qrCodeDataUrl);
  }

  async verifyToken(secret: string, token: string): Promise<boolean> {
    const result = await verify({ secret, token, epochTolerance: 1 });
    return result.valid;
  }
}
