export class AuthTokenPairEntity {
  readonly token_type = 'Bearer';

  constructor(
    readonly access_token: string,
    readonly refresh_token: string,
    readonly access_token_expires_at: string,
    readonly refresh_token_expires_at: string,
  ) {}
}
