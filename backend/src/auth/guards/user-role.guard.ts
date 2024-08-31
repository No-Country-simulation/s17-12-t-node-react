import {
  BadRequestException,
  type CanActivate,
  type ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { type Observable } from 'rxjs';

import { META_ROLE } from '../../auth/decorators';
import { type User } from '../../user/entities/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isAdmin: boolean = this.reflector.get(
      META_ROLE,
      context.getHandler(),
    );

    if (!isAdmin) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if (!user) throw new BadRequestException('User not found');
    if (user.isAdmin) return true;

    throw new ForbiddenException(`User not authorized`);
  }
}
