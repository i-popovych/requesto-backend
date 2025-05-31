import { Schema as MongooseSchema, Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  CommonStat,
  DeviceStat,
  TotalStats,
} from '../interface/response.interface';
import { StatResolution } from '../enum/mailgun.enum';

export const DomainStatCollectionName = 'DomainStats';
type StatDef = Map<string, CommonStat>;

@Schema({
  collection: DomainStatCollectionName,
  timestamps: true,
})
export class DomainStat extends Document {
  @Prop({
    required: true,
  })
  domain: string;

  @Prop({
    required: true,
    enum: StatResolution,
  })
  resolution: string;

  @Prop({
    type: MongooseSchema.Types.Mixed,
    default: null,
  })
  totals: TotalStats;

  @Prop({
    type: MongooseSchema.Types.Mixed,
    default: null,
  })
  provider: StatDef;

  @Prop({
    type: MongooseSchema.Types.Mixed,
    default: null,
  })
  devices: DeviceStat;

  @Prop({ type: MongooseSchema.Types.Mixed, default: null })
  countries: StatDef;

  @Prop({ type: Date, expires: 21600, isRequired: true, default: Date.now }) // TTL: 21600 = 6hrs
  expiredAt: Date;
}

export const DomainStatSchema = SchemaFactory.createForClass(DomainStat);

// Define compound index to enforce unique combination of domain and resolution;
DomainStatSchema.index({ domain: 1, resolution: 1 }, { unique: true });
