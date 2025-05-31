import { IsString } from 'class-validator';

export class ResponseMessageDto {
  @IsString()
  responderUserId: string;

  @IsString()
  chatId: string;

  @IsString()
  companyId: string;

  @IsString()
  message: string;
}
