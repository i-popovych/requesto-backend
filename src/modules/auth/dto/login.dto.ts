import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}

export class AuthTokenDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsBoolean()
  @IsOptional()
  isAccessToken?: boolean;
}

export class LoginWithLinkedinDto {
  @IsNotEmpty()
  @IsString()
  readonly token: string;

  @IsNotEmpty()
  @IsString()
  readonly redirectUri: string;
}
