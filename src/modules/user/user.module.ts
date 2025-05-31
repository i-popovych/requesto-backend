import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from '../common/common.module';
import { JwtGlobalModule } from '../jwt/jwt.module';
import { UserController } from './controllers/user.controller';
import { UserCollectionName, UserSchema } from './schemas/user.schema';

import { UserService } from 'src/modules/user/services/user.service';
import {
  CompanyCollectionName,
  CompanySchema,
} from '../company/schema/company.schema';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],

  imports: [
    MongooseModule.forFeature([
      { name: UserCollectionName, schema: UserSchema },
    ]),
    MongooseModule.forFeature([
      { name: CompanyCollectionName, schema: CompanySchema },
    ]),
    JwtGlobalModule,
    CommonModule,
    JwtModule,
  ],
})
export class UserModule {}
