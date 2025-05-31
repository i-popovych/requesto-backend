import { Module, forwardRef } from '@nestjs/common';

import { OpenAiController } from './open-ai.controller';
import { OpenAiService } from './open-ai.service';
import { MailgunModule } from 'src/modules/mailgun/mailgun.module';

@Module({
  imports: [MailgunModule],
  controllers: [OpenAiController],
  providers: [OpenAiService],
  exports: [OpenAiService],
})
export class OpenAiModule {}
