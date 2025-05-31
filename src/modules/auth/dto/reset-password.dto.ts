import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { regex } from 'src/common/validation/regex';

export class ResetPasswordDto {
  @IsString()
  @MinLength(6)
  @Matches(regex.password.pattern, { message: regex.password.message })
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  readonly token: string;
}

export class ResetPasswordWithOtpCodeDto {
  @IsString()
  @MinLength(6)
  @Matches(regex.password.pattern, { message: regex.password.message })
  readonly password: string;

  @IsNotEmpty()
  @IsNumber()
  readonly otpCode: string;

  @IsNotEmpty()
  @IsString()
  readonly token: string;
}
