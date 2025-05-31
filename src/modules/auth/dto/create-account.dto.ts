import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { regex } from 'src/common/validation/regex';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  readonly token: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Matches(regex.password.pattern, { message: regex.password.message })
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  readonly lastName: string;

  @IsNotEmpty()
  @IsString()
  readonly companyName: string;
}

export class ActivateAccountDto {
  @IsNotEmpty()
  @IsString()
  readonly token: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Matches(regex.password.pattern, { message: regex.password.message })
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  readonly lastName: string;

  @IsOptional()
  @IsString()
  readonly phone: string;

  @IsOptional()
  @IsString()
  readonly title: string;
}
