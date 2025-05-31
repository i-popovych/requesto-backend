import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CompanyService } from 'src/modules/company/services/company.service';
import { JwtModuleService } from '../../jwt/jwt.service';
import { USER_RESPONSE_MESSAGE } from '../../user/message/user.response';
import { UserService } from '../../user/services/user.service';
import { CreateAccountDto } from '../dto/create-account.dto';
import { SignUpDto } from '../dto/signup.dto';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtModuleService: JwtModuleService,
    private configService: ConfigService,
    private companyService: CompanyService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    try {
      const { firstName = '-', lastName = '-', email, password } = signUpDto;
      const existUser = await this.userService.findOneByEmail(email);

      if (existUser) {
        throw new BadRequestException('This email address was already invited');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        email,
        firstName,
        lastName,
        password: hashedPassword,
      };

      const user = await this.userService.create(newUser);

      if (user) {
        const token = await this.jwtModuleService.sign({
          _id: user._id,
          email: user.email,
        });

        return {
          data: { user, token, message: USER_RESPONSE_MESSAGE.createSuccess },
        };
      }
    } catch (error) {
      throw new BadRequestException(error?.response?.message || error?.message);
    }
  }

  async getMe(id: string) {
    try {
      const user = await this.userService.findById(id);
      if (!user) {
        throw new BadRequestException(USER_RESPONSE_MESSAGE.notFound);
      }

      return {
        user,
        message: USER_RESPONSE_MESSAGE.getInfoSuccess,
      };
    } catch (error) {
      throw new BadRequestException(error?.response?.message || error?.message);
    }
  }
}
