import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import compression from 'compression';
import { LoggerErrorInterceptor } from 'nestjs-pino';

export const appConfig = (app: INestApplication) => {
  app.enableCors();
  app.use(helmet());
  app.use(compression());
  app.enableShutdownHooks();
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Collectify API')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
};
