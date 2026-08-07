import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ApiErrorBody } from '../interfaces/error-response.interface';

const STATUS_CODE_MAP: Record<number, string> = {
  [HttpStatus.UNAUTHORIZED]: 'UNAUTHORIZED',
  [HttpStatus.FORBIDDEN]: 'FORBIDDEN',
  [HttpStatus.NOT_FOUND]: 'NOT_FOUND',
  [HttpStatus.TOO_MANY_REQUESTS]: 'RATE_LIMITED',
  [HttpStatus.CONFLICT]: 'DUPLICATE_ENTRY',
  [HttpStatus.BAD_REQUEST]: 'VALIDATION_ERROR',
  [HttpStatus.INTERNAL_SERVER_ERROR]: 'SERVER_ERROR',
};

@Catch()
export class HttpExceptionFilter implements ExceptionFilter<unknown> {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<{ method: string; url: string }>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = this.resolveMessage(exception);
    const code = this.resolveCode(exception, status);

    const body: ApiErrorBody = {
      error: {
        code,
        message,
      },
    };

    if (this.isDomainException(exception)) {
      if (exception.hint) body.error.hint = exception.hint;
      if (exception.details) body.error.details = exception.details;
    }

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      console.error(
        `[error] ${request.method} ${request.url} -> ${status} ${code}: ${message}`,
        exception,
      );
    }

    response.status(status).json(body);
  }

  private resolveCode(exception: unknown, status: number): string {
    if (this.isDomainException(exception)) return exception.code;
    return STATUS_CODE_MAP[status] ?? 'SERVER_ERROR';
  }

  private resolveMessage(exception: unknown): string {
    if (this.isDomainException(exception)) return exception.message;

    if (exception instanceof HttpException) {
      const payload = exception.getResponse();
      if (typeof payload === 'string') return payload;
      if (payload && typeof payload === 'object' && 'message' in payload) {
        const inner = (payload as { message: unknown }).message;
        if (Array.isArray(inner)) return inner.join('; ');
        if (typeof inner === 'string') return inner;
      }
      return exception.message;
    }

    if (exception instanceof Error) return exception.message;
    return 'Internal server error';
  }

  private isDomainException(exception: unknown): exception is HttpException & {
    code: string;
    hint?: string;
    details?: Record<string, unknown>;
  } {
    return (
      exception instanceof HttpException &&
      typeof (exception as HttpException & { code?: unknown }).code === 'string'
    );
  }
}
