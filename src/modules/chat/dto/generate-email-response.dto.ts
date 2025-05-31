import { IsEmail, IsOptional, IsString } from 'class-validator';

export class GenerateEmailResponseDto {
  @IsString()
  exampleEmail: string;

  @IsString()
  style: string;

  @IsString()
  currentEmail: string;

  @IsString()
  @IsOptional()
  chatId?: string;
}
