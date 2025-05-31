import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtGlobalModule } from '../jwt/jwt.module';
import {
  DomainStatCollectionName,
  DomainStatSchema,
} from './schema/mailgun-domain-stat.schema';
import {
  DomainConfigCollectionName,
  DomainConfigSchema,
} from './schema/mailgun-domain-config.schema';
import { MailgunMessageService } from './services/mailgun-message.service';
import {
  CompanyCollectionName,
  CompanySchema,
} from '../company/schema/company.schema';

@Module({
  providers: [MailgunMessageService],
  exports: [MailgunMessageService],
  imports: [
    MongooseModule.forFeature([
      { name: DomainStatCollectionName, schema: DomainStatSchema },
      { name: DomainConfigCollectionName, schema: DomainConfigSchema },
      { name: CompanyCollectionName, schema: CompanySchema },
    ]),
    JwtGlobalModule,
  ],
})
export class MailgunModule {}
