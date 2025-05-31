import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { OpenAIModels } from '../open-ai.enum';

export class CreateChatCompletionDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsEnum(OpenAIModels)
  @Type(() => String)
  model?: OpenAIModels;
}
