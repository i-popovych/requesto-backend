import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from 'src/modules/user/user.module';

import { configGlobal } from './config';
import { AuthModule } from './modules/auth/auth.module';
import { ChatModule } from './modules/chat/chat.module';
import { CompanyModule } from './modules/company/company.module';
import { JwtGlobalModule } from './modules/jwt/jwt.module';
import { OpenAiModule } from './modules/open-ai/open-ai.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: configGlobal,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('database.dbUri'),
      }),
      inject: [ConfigService],
    }),

    // BullBoardModule.forRoot({
    //   route: '/queues',
    //   adapter: ExpressAdapter, // Or FastifyAdapter from `@bull-board/fastify`
    // }),

    AuthModule,
    OpenAiModule,
    UserModule,
    JwtGlobalModule,
    CompanyModule,
    ChatModule,
  ],
})
export class AppModule {}
