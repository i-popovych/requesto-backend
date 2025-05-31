import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class GoogleSignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly given_name: string;

  @IsNotEmpty()
  @IsString()
  readonly family_name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly picture: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly email_verified: boolean;
}
