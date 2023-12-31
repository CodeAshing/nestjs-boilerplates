import { Logger, ValidationPipe, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from './config/config.service'
import { AppModule } from './app.module'

import { HttpExceptionFilter } from './app/common/filter/exception.filter'
import { createDocument } from './swagger/swagger'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as dotenv from 'dotenv'
import helmet from 'helmet'
import * as cookieParser from 'cookie-parser'

// import * as admin from 'firebase-admin';
// const serviceAccount = require('./firebase-adminSDK.json');

dotenv.config()
import 'reflect-metadata'
import {
  LoggingInterceptor,
  TransformInterceptor,
} from './app/common/interceptors'

const logger = new Logger('main')
;(async () => {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: true,
  })

  // app.enableCors({
  //   allowedHeaders:
  //     'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
  //   origin: true,
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  // });

  // set helmet to protect from well-known web vulnerabilities by setting HTTP headers appropriately.
  app.use(helmet())

  // set validation pipe to validate request body
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  )
  // set exception filter to handle all exceptions
  app.useGlobalFilters(new HttpExceptionFilter())

  // set versioning to all routes
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  })

  // set logging interceptor to log all requests
  app.useGlobalInterceptors(new LoggingInterceptor())

  // set response transform interceptor to log all requests
  app.useGlobalInterceptors(new TransformInterceptor())

  const configService = app.get(ConfigService)

  const config = new DocumentBuilder()
    .setTitle('Mongoose Application')
    .setDescription('Mongoose API Application')
    .setVersion('v1')
    .addTag('Development')
    .addCookieAuth(
      'api-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
      {
        type: 'http',
        scheme: 'bearer',
        in: 'header',
      },
    )
    .build()
  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('/v1/swagger', app, document)

  app.use(cookieParser(configService.get().cookieSecret))

  await app.listen(configService.get().port || 4000)
  logger.log(`SERVER IS RUNNING ON PORT ${configService.get().port}`)
})()
