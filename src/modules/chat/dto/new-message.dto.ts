import { IsEmail, IsString } from 'class-validator';

export class NewMessageDto {
  @IsEmail()
  from: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  companyId: string;

  @IsString()
  message: string;
}
