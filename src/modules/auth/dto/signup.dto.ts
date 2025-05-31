import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Types } from 'mongoose';
import { regex } from 'src/common/validation/regex';

export class SignUpDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @Matches(regex.password.pattern, { message: regex.password.message })
  readonly password: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  readonly firstName: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  readonly lastName: string;
}
