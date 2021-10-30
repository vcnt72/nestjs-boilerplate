import { RequirePermissionsGuard } from './require-permissions.guard';

describe('RequirePermissionsGuard', () => {
  it('should be defined', () => {
    expect(new RequirePermissionsGuard()).toBeDefined();
  });
});
