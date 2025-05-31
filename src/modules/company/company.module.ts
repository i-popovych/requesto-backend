import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { MailgunModule } from 'src/modules/mailgun/mailgun.module';
import {
  UserCollectionName,
  UserSchema,
} from 'src/modules/user/schemas/user.schema';
import { JwtGlobalModule } from '../jwt/jwt.module';
import { OpenAiModule } from '../open-ai/open-ai.module';
import { UserModule } from '../user/user.module';
import { CompanyController } from './controllers/company.controller';
import { CompanyCollectionName, CompanySchema } from './schema/company.schema';
import { CompanyService } from './services/company.service';
@Module({
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
  imports: [
    MongooseModule.forFeature([
      { name: CompanyCollectionName, schema: CompanySchema },
      { name: UserCollectionName, schema: UserSchema },
    ]),
    UserModule,
    JwtGlobalModule,
    OpenAiModule,
    ScheduleModule.forRoot(),
    MailgunModule,
  ],
})
export class CompanyModule {}
