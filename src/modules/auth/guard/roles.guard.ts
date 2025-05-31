import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, Roles } from 'src/modules/auth/decorators/roles.decorator';
import { UserRole } from 'src/modules/user/enum/user.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  private matchRoles(roles: UserRole[], userRoles: UserRole[]): boolean {
    if (!roles?.length) {
      return false;
    }

    return roles.every((item) => userRoles.includes(item));
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();

    const { user } = request;

    const isAllRoles = this.matchRoles(roles, user?.roles);

    if (!isAllRoles) {
      throw new ForbiddenException();
    }

    return true;
  }
}
