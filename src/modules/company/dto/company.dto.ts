import { IsArray, IsNotEmpty } from 'class-validator';

export class ExistingMemberDto {
  @IsNotEmpty()
  @IsArray()
  readonly emailList: string[];
}
