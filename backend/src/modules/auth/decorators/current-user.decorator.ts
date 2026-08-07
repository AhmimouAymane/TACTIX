import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedUserEntity } from '../entities/authenticated-user.entity';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthenticatedUserEntity => {
    const request = ctx.switchToHttp().getRequest<{ user: AuthenticatedUserEntity }>();
    return request.user;
  },
);
