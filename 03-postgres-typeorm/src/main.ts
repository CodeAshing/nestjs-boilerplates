import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import helmet from 'helmet';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(helmet());
  dotenv.config();
  app.setGlobalPrefix('api');

  // Log each request
  app.use((req, res, next) => {
    logger.log(`Request ${req.method} ${req.originalUrl}`);
    next();
  });

  (app as any).set('etag', false);

  app.use((req, res, next) => {
    res.removeHeader('x-powered-by');
    res.removeHeader('date');
    next();
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('TypeORM with Postgres Application')
    .setDescription('Reusable NestJS API template')
    .setVersion('1.0')
    .addTag('Development')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/v1/swagger', app, document);

  await app.listen(5000);
}
bootstrap();
