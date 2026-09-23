import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthenticatedUserEntity } from '../../auth/entities/authenticated-user.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user as AuthenticatedUserEntity | undefined;
    if (user && user.role === 'ADMIN') {
      return true;
    }
    throw new ForbiddenException('Admin access required');
  }
}
