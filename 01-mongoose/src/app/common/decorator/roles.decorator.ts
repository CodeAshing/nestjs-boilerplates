import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (roles: any) => SetMetadata(ROLES_KEY, roles);
