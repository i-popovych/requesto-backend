import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Matches,
  IsOptional,
  IsArray,
  IsStrongPassword,
  IsBoolean,
  ValidateIf,
  IsEnum,
} from 'class-validator';
import { Types } from 'mongoose';
import { regex } from 'src/common/validation/regex';
import { AuthProvider } from '../enum/user.enum';

export class CreateUserDto {
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
  readonly avatar?: string;

  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @ValidateIf((o) => o.leadGenEmail !== '')
  @IsOptional()
  @IsEmail({}, { message: 'Please enter correct lead gen email' })
  readonly leadGenEmail?: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  @Matches(regex.password.pattern, { message: regex.password.message })
  readonly password: string;

  @IsOptional()
  readonly locale?: string;

  @IsOptional()
  readonly phoneDetails: {
    countryName: string;
    countryCode: string;
    number: string;
  };

  @IsOptional()
  @IsBoolean()
  readonly isDisabled: boolean;

  @IsString()
  @IsOptional()
  readonly type?: string;

  @IsEnum(AuthProvider)
  @IsOptional()
  readonly authMethod?: AuthProvider;

  @IsString()
  @IsOptional()
  readonly zapierApiKey?: string;

  @IsArray()
  @IsOptional()
  readonly roles?: string[];

  @IsArray()
  @IsOptional()
  readonly platforms?: string[];

  @IsOptional()
  readonly inviteStatus?: string;

  @IsNotEmpty()
  readonly company: Types.ObjectId;

  @IsOptional()
  readonly whiteLabel?: Types.ObjectId;

  @IsOptional()
  readonly referralClaimedCount?: number;

  @IsOptional()
  readonly subdomain?: string;
}

export class SuperAdminEditUserDto {
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
}

export class AuditLogParams {
  @IsNotEmpty()
  readonly invitedBy: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  readonly changedByRefModel: string;
}

export class InviteUserDto extends PartialType(CreateUserDto) {}
