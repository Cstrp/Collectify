import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig } from './config';
import { Logger } from '@nestjs/common';
import * as process from 'process';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  appConfig(app);
  await app.listen(3000 || process.env.PORT);

  return app.getUrl();
};

(async () => {
  try {
    const url = await bootstrap();
    Logger.log(url, 'Bootstrap');
  } catch (error) {
    Logger.error(error, 'Bootstrap error');
  }
})();
