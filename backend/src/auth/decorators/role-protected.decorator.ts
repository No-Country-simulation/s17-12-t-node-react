import { SetMetadata } from '@nestjs/common';

export const META_ROLE = 'isAdmin';

export const RoleProtected = (isAdmin: boolean) => {
  return SetMetadata(META_ROLE, isAdmin);
};
