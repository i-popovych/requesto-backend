import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class MailgunCreateDomainDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly webPixelProfileId: string;

  @IsString()
  @IsOptional()
  readonly webScheme: string;

  @IsString()
  @IsOptional()
  readonly dkimHostName: string;

  @IsString()
  @IsOptional()
  readonly dkimKeySize: string;

  @IsString()
  @IsOptional()
  readonly dkimSelector: string;

  @IsBoolean()
  @IsOptional()
  readonly encryptIncomingMessage: boolean;

  @IsBoolean()
  @IsOptional()
  readonly forceDkimAuthority: boolean;

  @IsBoolean()
  @IsOptional()
  readonly forceRootDkimHost: boolean;

  @IsBoolean()
  @IsOptional()
  readonly wildcard: boolean;

  @IsString()
  @IsOptional()
  readonly poolId: string;

  @IsString()
  @IsOptional()
  readonly ips: string;

  @IsString()
  @IsOptional()
  readonly spamAction: string;

  @IsString()
  @IsOptional()
  readonly smtpPassword: string;

  @IsBoolean()
  @IsOptional()
  readonly useAutomaticSenderSecurity: boolean;

  @IsString()
  @IsOptional()
  readonly webPrefix: string;
}
