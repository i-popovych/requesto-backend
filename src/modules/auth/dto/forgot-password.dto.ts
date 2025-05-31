export class CreateAuthDto {}
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ForgotPasswordDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;
}

export class VerifyResetPasswordTokenDto {
  @IsNotEmpty()
  @IsString()
  readonly token: string;
}
