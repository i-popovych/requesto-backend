import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModuleService } from './jwt.service';
import { JWTCollectionName, JWTSchema } from './jwt.schema';
import { UserCollectionName, UserSchema } from '../user/schemas/user.schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('auth.secret'),
          signOptions: {
            expiresIn: config.get<string | number>('auth.expiresIn'),
          },
        };
      },
    }),
    MongooseModule.forFeature([
      { name: JWTCollectionName, schema: JWTSchema },
      { name: UserCollectionName, schema: UserSchema },
    ]),
  ],
  providers: [JwtModuleService],
  exports: [JwtModuleService],
})
export class JwtGlobalModule {}
