import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export const JWTCollectionName = 'JWT';

@Schema({
  timestamps: true,
  collection: JWTCollectionName,
})
export class JWT extends Document {
  @Prop({
    default: false,
  })
  isExpired: boolean;

  @Prop({
    index: true,
  })
  token: string;

  @Prop()
  payload: mongoose.Schema.Types.Mixed;
}

export const JWTSchema = SchemaFactory.createForClass(JWT);
