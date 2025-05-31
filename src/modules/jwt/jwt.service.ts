import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserCollectionName } from '../user/schemas/user.schema';
import { JWT_RESPONSE_MESSAGE } from './message/jwt.response';

import { JWT, JWTCollectionName } from './jwt.schema';

@Injectable()
export class JwtModuleService {
  secret = null;
  whiteListSubdomains = null;
  previewSubdomainWildcard = null;

  constructor(
    @InjectModel(UserCollectionName)
    private readonly userModel: Model<User>,
    @InjectModel(JWTCollectionName)
    private readonly jwtModel: Model<JWT>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.secret = this.configService.get<string>('auth.secret');
  }

  async verifyAsync(token: string) {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.secret,
      });
    } catch (error) {
      const errorMessage =
        error?.message === 'jwt expired'
          ? JWT_RESPONSE_MESSAGE.jwtExpired
          : error?.message;
      throw new BadRequestException(errorMessage);
    }
  }

  async sign(payload: string | object | Buffer): Promise<string> {
    const expiresIn = this.configService.get<string>('auth.expiresIn') || '';
    return this.jwtService.sign({
      payload: payload,
      secret: this.secret,
      options: { expiresIn },
    });
  }

  async signEmailToken(payload: string | object | Buffer): Promise<string> {
    const expiresIn =
      this.configService.get<string>('email.emailExpiresInToken') || '';
    return this.jwtService.sign({
      payload: payload,
      secret: this.secret,
      options: { expiresIn },
    });
  }

  async generateOneTimeEmailToken(
    payload: string | object | Buffer,
  ): Promise<string> {
    const expiresIn =
      this.configService.get<string>('email.emailExpiresInToken') || '';

    const token = this.jwtService.sign({
      payload,
      secret: this.secret,
      options: { expiresIn },
    });

    await new this.jwtModel({
      token,
      payload,
    }).save();

    return token;
  }

  async signActivateAccount(
    payload: string | object | Buffer,
  ): Promise<string> {
    const expiresIn =
      this.configService.get<string>('auth.expiresInActiveAccount') || '';
    return this.jwtService.sign({
      payload: payload,
      secret: this.secret,
      options: { expiresIn },
    });
  }

  async generateOneTimeActivateAccountToken(
    payload: string | object | Buffer,
  ): Promise<string> {
    const expiresIn =
      this.configService.get<string>('auth.expiresInActiveAccount') || '';

    const token = this.jwtService.sign({
      payload,
      secret: this.secret,
      options: { expiresIn },
    });

    await new this.jwtModel({
      token,
      payload,
    }).save();

    return token;
  }

  async getJWT(token: string) {
    return await this.jwtModel.findOne({ token });
  }

  async verifyUser(userId: string, email: string) {
    try {
      const user = await this.userModel.findOne({
        _id: userId,
        email,
      });

      if (!user) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
