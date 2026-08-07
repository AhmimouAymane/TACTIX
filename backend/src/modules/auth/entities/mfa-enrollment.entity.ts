export class MfaEnrollmentEntity {
  constructor(
    readonly secret: string,
    readonly otpauth_url: string,
    readonly qr_code_data_url: string | null = null,
  ) {}
}
