import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class VerifyOneTimeTokensDto {
  @IsNotEmpty()
  @IsString()
  readonly token: string;

  @IsOptional()
  @IsBoolean()
  readonly shouldExpire: boolean;
}
