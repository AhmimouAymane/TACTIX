import { HttpException, HttpStatus } from '@nestjs/common';

export class DomainException extends HttpException {
  readonly code: string;
  readonly hint?: string;
  readonly details?: Record<string, unknown>;

  constructor(
    code: string,
    message: string,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
    details?: Record<string, unknown>,
    hint?: string,
  ) {
    super(message, status);
    this.code = code;
    this.details = details;
    this.hint = hint;
  }
}
