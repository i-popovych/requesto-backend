import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { GenerateEmailResponseDto } from 'src/modules/chat/dto/generate-email-response.dto';

import { NewMessageDto } from 'src/modules/chat/dto/new-message.dto';
import { ResponseMessageDto } from 'src/modules/chat/dto/response-message.dto';
import { UpdateChatSettingsDto } from 'src/modules/chat/dto/update-settings.dto';
import {
  ChatCollectionName,
  ChatModel,
} from 'src/modules/chat/shema/chat.schema';
import {
  Message,
  MessageCollectionName,
} from 'src/modules/chat/shema/message.schema';
import { CompanyService } from 'src/modules/company/services/company.service';
import { MailgunMessageService } from 'src/modules/mailgun/services/mailgun-message.service';
import { OpenAiService } from 'src/modules/open-ai/open-ai.service';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(ChatCollectionName)
    private chatModel: Model<ChatModel>,
    @InjectModel(MessageCollectionName)
    private messageModel: Model<Message>,
    private companyService: CompanyService,
    private openaiService: OpenAiService,
    private mailgunService: MailgunMessageService,
    private userService: UserService,
  ) {}

  async newMessage(dto: NewMessageDto) {
    try {
      const { from, companyId, message, firstName, lastName } = dto;

      let chat;

      chat = await this.chatModel.findOne({
        externalSenderEmail: from,
        companyId,
      });

      if (!chat) {
        chat = await this.chatModel.create({
          externalSenderEmail: from,
          companyId,
          firstName,
          lastName,
        });
      }

      const newMessage = await this.messageModel.create({
        message,
        company: companyId,
        exteranlSenderEmail: from,
        chat: chat._id,
      });

      this.generateAutoResponse(dto);

      return {
        data: newMessage,
        message: 'Message sent successfully',
      };
    } catch {
      throw new BadRequestException();
    }
  }

  async getMessagesByExternalUserEmail(email: string) {
    try {
      return await this.messageModel.find({ exteranlSenderEmail: email });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async generateAutoResponse(dto: NewMessageDto) {
    const { companyId, from, message } = dto;

    const company = await this.companyService.findOneById(companyId);
    const chat = await this.chatModel.findOne({ externalSenderEmail: from });

    if (!chat.autoResponse) return;

    const chatHistory = await this.getMessagesByExternalUserEmail(from);
    const formattedChatHistory = chatHistory.map((chat) => chat.message);

    const allCHhatHistory = await this.messageModel.find();
    const allFormattedChatHistory = allCHhatHistory.map((chat) => chat.message);

    const response = await this.openaiService.create({
      content: `Analyze the chat history and generate a response to the user. Remember you need to act like company consultant. So use "Reach us", "We will help" words etc. You need to emulate human behavior and provide a helpful response. Please don't answer in AI manner
      
      New user message: ${message}
      Company Information: ${company.description}
      Chat History: ${formattedChatHistory}
      All chats history: ${allFormattedChatHistory}
      `,
    });

    this.messageModel.create({
      message: response.data.completion.message.content,
      company: companyId,
      isAutoResponse: true,
      chat: chat._id,
    });

    this.mailgunService.sendMessage({
      subject: 'Response from customer team',
      to: from,
      text: response.data.completion.message.content,
    });
  }

  async sendResponse(dto: ResponseMessageDto) {
    const { chatId, companyId, message, responderUserId } = dto;

    const company = await this.companyService.findOneById(companyId);
    const admin = await this.userService.findById(responderUserId);
    const chat = await this.chatModel.findById(chatId);

    if (!admin) {
      throw new NotFoundException('User was not found');
    }

    this.messageModel.create({
      message: message,
      company: company._id,
      isAutoResponse: true,
      chat: new Types.ObjectId(chatId),
      admin: new Types.ObjectId(responderUserId),
    });

    this.mailgunService.sendMessage({
      subject: 'Response from customer team',
      to: chat.externalSenderEmail,
      text: message,
    });
  }

  async getCompanyChat(companyId: Types.ObjectId) {
    try {
      const chats = await this.chatModel.find({ companyId });

      const chatList = await Promise.all(
        chats.map(async (chat) => {
          const messages = await this.messageModel.find({ chat: chat._id });

          return {
            chat,
            messages,
          };
        }),
      );

      return { chatList };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async getGeneratedEmailTemplate(payload: GenerateEmailResponseDto) {
    try {
      let chatHistory = '';
      const chat = await this.chatModel.findById(payload.chatId);
      if (chat) {
        const messages = await this.getMessagesByExternalUserEmail(
          chat.externalSenderEmail,
        );
        chatHistory = messages.map((msg) => msg.message).join('\n');
      }

      const response = await this.openaiService.create({
        content: `
        Generate a response to the email. Please use ${payload.style} style. 
        Also use the chat history to generate a more accurate response.
        Chat history: ${chatHistory}
        Email message: ${payload.exampleEmail}
        Current response: ${payload.currentEmail}
        `,
      });

      return {
        data: response.data.completion.message.content,
        message: 'Email template generated successfully',
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async updateSettings(dto: UpdateChatSettingsDto) {
    try {
      await this.chatModel.findByIdAndUpdate(dto.chatId, {
        $set: { autoResponse: dto.isAnswerAutomatically },
      });

      return {
        message: 'Company settings updated',
      };
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
