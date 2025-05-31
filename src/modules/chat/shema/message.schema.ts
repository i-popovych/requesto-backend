import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ChatCollectionName } from 'src/modules/chat/shema/chat.schema';
import { CompanyCollectionName } from 'src/modules/company/schema/company.schema';
import { UserCollectionName } from 'src/modules/user/schemas/user.schema';

export const MessageCollectionName = 'Message';

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({
    isRequired: true,
  })
  message: string;

  @Prop()
  exteranlSenderEmail: string;

  @Prop({
    type: Types.ObjectId,
    ref: CompanyCollectionName,
  })
  company: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: UserCollectionName,
  })
  admin: Types.ObjectId;

  @Prop({
    default: false,
    type: Boolean,
  })
  isAutoResponse: boolean;

  @Prop({
    type: Types.ObjectId,
    ref: ChatCollectionName,
  })
  chat: Types.ObjectId;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
