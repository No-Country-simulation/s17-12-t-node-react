import { UseGuards, applyDecorators } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from './role-protected.decorator';

export function Auth(isAdmin: boolean = false) {
  return applyDecorators(RoleProtected(isAdmin), UseGuards(AuthGuard('jwt')));
}
