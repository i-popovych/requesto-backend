import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthGoogleValidation {
  @IsNotEmpty()
  @IsString()
  readonly token: string;

  @IsOptional()
  @IsBoolean()
  readonly isMobile?: boolean;
}
