import { IsBoolean, IsString } from 'class-validator';

export class UpdateChatSettingsDto {
  @IsBoolean()
  isAnswerAutomatically: boolean;

  @IsString()
  chatId: string;
}
