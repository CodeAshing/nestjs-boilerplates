import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from './config/config.service';
import { AppModule } from './app.module';

import { HttpExceptionFilter } from './app/common/filter/exception.filter';
import { createDocument } from './swagger/swagger';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import * as csurf from 'csurf';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';

import { SocketIoAdapter } from './socket-io.adapter';


// import * as admin from 'firebase-admin';
// const serviceAccount = require('./firebase-adminSDK.json');

dotenv.config();
import 'reflect-metadata';
import {
  LoggingInterceptor,
  TransformInterceptor,
} from './app/common/interceptors';

const logger = new Logger('main');
(async () => {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: true,
  });

  //set csurf to protect from csrf attacks
  // app.use(csurf());

  // app.enableCors({
  //   allowedHeaders:
  //     'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
  //   origin: true,
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  // });

  // set helmet to protect from well-known web vulnerabilities by setting HTTP headers appropriately.
  app.use(helmet());

  // set validation pipe to validate request body
  app.useGlobalPipes(
    new ValidationPipe({      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );
  // set exception filter to handle all exceptions
  app.useGlobalFilters(new HttpExceptionFilter());

  // set versioning to all routes
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  
  // set logging interceptor to log all requests
  app.useGlobalInterceptors(new LoggingInterceptor());

  // set response transform interceptor to log all requests
  app.useGlobalInterceptors(new TransformInterceptor());

  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('ERP Application')
    .setDescription('ERP API Application')
    .setVersion('v1')
    .addTag('Development')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();

  // firebase App initialization

  // global.firebaseApp = admin.initializeApp({
  //   credential: admin.credential.cert(serviceAccount),
  // });

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/v1/swagger', app, document);

  app.useWebSocketAdapter(new SocketIoAdapter(app));

  app.use(cookieParser(configService.get().cookieSecret));
  // await app.listen(process.env.PORT || configService.get().port);
  await app.listen(configService.get().port || 8080);
  logger.log(`SERVER IS RUNNING ON PORT ${configService.get().port}`);
})();