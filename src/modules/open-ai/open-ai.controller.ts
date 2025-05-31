import { Body, Controller, Post } from '@nestjs/common';
import { CreateChatCompletionDto } from './dto/create-chat-completion.dto';
import { OpenAiResponse } from './interface/open-ai.interface';
import { OpenAiService } from './open-ai.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('open-ai')
export class OpenAiController {
  constructor(private readonly openAiService: OpenAiService) {}

  @Post('/chat-completions')
  @ApiOperation({ summary: 'Generate chat completions with OpenAI GPT.' })
  create(@Body() data: CreateChatCompletionDto): Promise<OpenAiResponse> {
    return this.openAiService.create(data);
  }
}
