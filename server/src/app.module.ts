import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { Module } from '@nestjs/common';
import { loggerConfig } from './config';
import { JwtModule } from '@nestjs/jwt';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from './modules/cron/cron.module';
import { AuthenticationModule } from './authentication';
import { CloudinaryModule, DatabaseModule, UsersModule } from './modules';
import { CollectionsModule } from './collections';

@Module({
  imports: [
    AuthenticationModule,
    DatabaseModule,
    UsersModule,
    CollectionsModule,
    CloudinaryModule,
    CronModule,
    ScheduleModule.forRoot(),
    LoggerModule.forRoot(loggerConfig),
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT_ACCESS_TOKEN_SECRET'),
      }),
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
