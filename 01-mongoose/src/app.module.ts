import { AdministrationModule } from './app/modules/administration/administration.module';
import { AdministrationController } from './app/modules/administration/administration.controller';
import { DatabaseModule } from 'src/database/database.module';
import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import * as dotenv from 'dotenv';
dotenv.config();

//--- imports ---
import { MongooseModule } from '@nestjs/mongoose';

//--- modules ---
import { TypeModule, PermissionModule, UsersModule } from './app/modules';

import { AuthModule } from './app/auth/auth.module';
import { connectionEnum } from 'src/app/common/enum';

import { ConfigModule } from './config/config.module';
import { LoggerModule } from './logger/logger.module';
import { EmployersSchema, Employers, RoleSchema, Role } from './app/schema';

import {
  Auth,
  AuthSchema,
  Client,
  ClientSchema,
} from './app/modules/user/schema';

import { DealerSchema, Dealer } from './app/modules/user/schema';

@Module({
  imports: [
    AdministrationModule,
    // --- Settings ---
    ScheduleModule.forRoot(),
    ConfigModule,
    LoggerModule, // --- Logger ---
    CacheModule.register({
      isGlobal: true,
    }),
    // --- Connections ---
    DatabaseModule.forRoot(),
    MongooseModule.forFeature(
      [
        { name: Dealer.name, schema: DealerSchema },
        { name: Client.name, schema: ClientSchema },
        { name: Employers.name, schema: EmployersSchema },
        { name: Role.name, schema: RoleSchema },
        { name: Auth.name, schema: AuthSchema },
      ],
      connectionEnum.ERP,
    ),


    // --- Modules ---
    AuthModule,
    UsersModule,
    PermissionModule,
    TypeModule,
  ],
  controllers: [AdministrationController, AppController],
  providers: [AppService],
})
export class AppModule { }
