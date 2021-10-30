import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { JwtUserPayload } from 'src/auth/user-jwt-payload.model';
import { REQUIRE_PERMISSION_KEY } from '../decorator/require-permissions.decorator';

@Injectable()
export class RequirePermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<Permissions[]>(
      REQUIRE_PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true;
    }

    const { user }: { user: JwtUserPayload } = context
      .switchToHttp()
      .getRequest();

    return requiredPermissions.every((val) => user.permissions?.includes(val));
  }
}
