import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  wrapFullName(firstName: string, lastName?: string) {
    return `${firstName ?? ''}${lastName ? ` ${lastName}` : ''}`;
  }
}
