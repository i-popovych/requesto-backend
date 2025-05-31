import { Request } from 'express';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtModuleService } from './../../jwt/jwt.service';
import { UserNature } from 'src/modules/user/enum/user.enum';

@Injectable()
export class AuthGuardUser implements CanActivate {
  constructor(private jwtModuleService: JwtModuleService) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const data = await this.jwtModuleService.verifyAsync(token);

      if (!data.payload?._id || !data.payload?.email) {
        throw new UnauthorizedException();
      }

      const verifiedUser = await this.jwtModuleService.verifyUser(
        data.payload?._id,
        data.payload?.email,
      );

      request['user'] = { ...data.payload, ...verifiedUser.toObject() };
      request['userNature'] = UserNature.User;

      return true;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      } else if (error instanceof UnauthorizedException) {
        throw error;
      } else {
        throw new UnauthorizedException();
      }
    }
  }
}
