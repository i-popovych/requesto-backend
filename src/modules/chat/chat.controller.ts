import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/modules/auth/decorators/user.decorator';
import { NewMessageDto } from 'src/modules/chat/dto/new-message.dto';
import { UserInterFace } from 'src/modules/user/interface/user.interface';

import { ChatService } from 'src/modules/chat/chat.service';
import { ResponseMessageDto } from 'src/modules/chat/dto/response-message.dto';
import { AuthGuardUser } from 'src/modules/auth/guard/auth.guard';
import { GenerateEmailResponseDto } from 'src/modules/chat/dto/generate-email-response.dto';
import { ApiOperation } from '@nestjs/swagger';
import { UpdateChatSettingsDto } from 'src/modules/chat/dto/update-settings.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AuthGuardUser)
  @Get('/company')
  async getCompanyChat(@User() user: UserInterFace) {
    return await this.chatService.getCompanyChat(user.company._id);
  }

  @UseGuards(AuthGuardUser)
  @Post('/generate-email-response')
  async getGeneratedEmailTemplate(
    @User() user: UserInterFace,
    @Body() dto: GenerateEmailResponseDto,
  ) {
    return await this.chatService.getGeneratedEmailTemplate(dto);
  }

  @Post('/message')
  async create(@Body() dto: NewMessageDto) {
    return await this.chatService.newMessage(dto);
  }

  @Post('/response')
  async responseMessage(@Body() dto: ResponseMessageDto) {
    return await this.chatService.sendResponse(dto);
  }

  @UseGuards(AuthGuardUser)
  @Patch('/settings')
  @ApiOperation({
    summary: 'Update company settings.',
  })
  async updateSettings(@Body() dto: UpdateChatSettingsDto) {
    return await this.chatService.updateSettings(dto);
  }
}
