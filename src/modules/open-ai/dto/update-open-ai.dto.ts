import { PartialType } from '@nestjs/mapped-types';
import { CreateChatCompletionDto } from './create-chat-completion.dto';

export class UpdateOpenAiDto extends PartialType(CreateChatCompletionDto) {}
