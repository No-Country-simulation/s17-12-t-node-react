import { UseGuards, applyDecorators } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { RoleProtected } from '.';
import { UserRoleGuard } from '../guards/user-role.guard';

export function Auth({ isAdmin }: { isAdmin: boolean } = { isAdmin: false }) {
  return applyDecorators(
    RoleProtected(isAdmin),
    UseGuards(AuthGuard('jwt'), UserRoleGuard),
  );
}
