import { Schema as MongooseSchema, Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DnsRecordDto, DomainDto } from '../dto/mailgun-response.dto';
import { DomainPurpose } from '../enum/mailgun.enum';
import {
  Company,
  CompanyCollectionName,
} from 'src/modules/company/schema/company.schema';

export const DomainConfigCollectionName = 'DomainConfig';

@Schema({
  collection: DomainConfigCollectionName,
  timestamps: true,
})
export class DomainConfig extends Document {
  @Prop({
    required: true,
    type: String,
    enum: DomainPurpose,
  })
  purpose: string;

  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  domain: string;

  @Prop({
    required: false,
  })
  webPixelProfileId: MongooseSchema.Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: CompanyCollectionName,
  })
  company: MongooseSchema.Types.ObjectId | Company | null;

  @Prop({
    required: false,
  })
  details: DomainDto;

  @Prop({
    type: MongooseSchema.Types.Mixed,
    default: null,
  })
  sendingDnsRecords: DnsRecordDto[];

  @Prop({
    type: MongooseSchema.Types.Mixed,
    default: null,
  })
  receivingDnsRecords: DnsRecordDto[];
}

export const DomainConfigSchema = SchemaFactory.createForClass(DomainConfig);
