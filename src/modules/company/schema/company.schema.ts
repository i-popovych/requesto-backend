import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export const CompanyCollectionName = 'Company';
@Schema({ timestamps: true })
export class Company extends Document {
  @Prop({
    isRequired: true,
  })
  companyName: string;

  @Prop({
    isRequired: false,
  })
  description: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
