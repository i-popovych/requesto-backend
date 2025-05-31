import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatController } from 'src/modules/chat/chat.controller';
import { ChatService } from 'src/modules/chat/chat.service';
import {
  ChatCollectionName,
  ChatSchema,
} from 'src/modules/chat/shema/chat.schema';
import {
  MessageCollectionName,
  MessageSchema,
} from 'src/modules/chat/shema/message.schema';
import { CompanyModule } from 'src/modules/company/company.module';
import { JwtGlobalModule } from 'src/modules/jwt/jwt.module';
import { MailgunModule } from 'src/modules/mailgun/mailgun.module';
import { OpenAiModule } from 'src/modules/open-ai/open-ai.module';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ChatCollectionName, schema: ChatSchema },
      { name: MessageCollectionName, schema: MessageSchema },
    ]),
    CompanyModule,
    OpenAiModule,
    MailgunModule,
    UserModule,
    JwtGlobalModule,
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
