import { SetMetadata } from '@nestjs/common';

export const REQUIRE_PERMISSION_KEY = 'require-permissions';
export const RequirePermissions = (...args: string[]) =>
  SetMetadata(REQUIRE_PERMISSION_KEY, args);
