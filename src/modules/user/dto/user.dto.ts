export class CreateAuthDto {}
import {
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  MaxLength,
  IsOptional,
  IsArray,
  IsBooleanString,
} from 'class-validator';
import { regex } from 'src/common/validation/regex';

export class UpdateProfileDto {
  readonly avatar?: string;

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

  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly role?: string;

  @IsOptional()
  readonly phone?: string;

  @IsOptional()
  @IsBooleanString()
  readonly isDeleteAvatar?: boolean;
}

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Matches(regex.password.pattern, { message: regex.password.message })
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly confirmPassword: string;
}

export class UpdateRoles {
  @IsArray()
  @IsNotEmpty()
  readonly roles: string[];
}

export class ChangePasswordDto {
  @IsString()
  @MinLength(6)
  @Matches(regex.password.pattern, { message: regex.password.message })
  readonly oldPassword: string;

  @IsString()
  @MinLength(6)
  @Matches(regex.password.pattern, { message: regex.password.message })
  readonly newPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Matches(regex.password.pattern, { message: regex.password.message })
  readonly confirmPassword: string;
}

export class UpdateLinkedinDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  readonly linkedinAccount: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  readonly linkedinPassword: string;
}

export class RestrictAccountDto {
  @IsString()
  @IsNotEmpty()
  readonly restrictReason: string;
}

export class DeviceTokenDto {
  @IsString()
  @IsNotEmpty()
  readonly token: string;
}
