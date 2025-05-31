import { Module } from '@nestjs/common';
import { AxiosHelpers } from './axios-helpers.service';

@Module({
  providers: [AxiosHelpers],
  exports: [AxiosHelpers],
})
export class AxiosHelpersModule {}
