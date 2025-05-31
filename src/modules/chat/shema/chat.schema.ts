import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export const ChatCollectionName = 'Chat';

@Schema({ timestamps: true })
export class ChatModel extends Document {
  @Prop({
    isRequired: true,
  })
  companyId: string;

  @Prop()
  externalSenderEmail: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  autoResponse: boolean;
}

export const ChatSchema = SchemaFactory.createForClass(ChatModel);
