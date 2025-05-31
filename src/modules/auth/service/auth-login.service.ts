import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtModuleService } from '../../jwt/jwt.service';
import { UserService } from '../../user/services/user.service';
import { LoginDto } from '../dto/login.dto';
import { LoginResponse } from '../interface/auth.interface';
import { AUTH_RESPONSE_MESSAGE } from '../message/auth.response';

@Injectable()
export class AuthLoginService {
  constructor(
    private userService: UserService,
    private jwtModuleService: JwtModuleService,
  ) {}

  async login(loginDto: LoginDto, req: any) {
    try {
      const { email, password } = loginDto;
      const user = await this.userService.findOneByEmail(email);

      if (!user) {
        throw new UnauthorizedException(AUTH_RESPONSE_MESSAGE.loginInvalid);
      }

      // if (user.isDisabled) {
      //   throw new UnauthorizedException(AUTH_RESPONSE_MESSAGE.deactivated);
      // }

      const isPasswordMatched = await bcrypt.compare(password, user.password);

      if (!isPasswordMatched) {
        throw new UnauthorizedException(AUTH_RESPONSE_MESSAGE.loginInvalid);
      }

      const token = await this.jwtModuleService.sign({
        _id: user._id,
        email: user.email,
      });

      return {
        data: {
          user,
          message: AUTH_RESPONSE_MESSAGE.loginSuccess,
          token,
        },
      };
    } catch (error) {
      throw new BadRequestException(error?.response?.message || error?.message);
    }
  }
}
