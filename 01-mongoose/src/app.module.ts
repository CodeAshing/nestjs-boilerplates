import { DatabaseModule } from 'src/database/database.module';
import {
  Module,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';

import { CacheModule } from '@nestjs/cache-manager';
dotenv.config();


//--- modules ---
import { TodoModule, UsersModule } from './app/modules';

import { AuthModule } from './app/auth/auth.module';

import { ConfigModule } from './config/config.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    // --- Settings ---
    ConfigModule,
    LoggerModule, // --- Logger ---
    CacheModule.register({
      isGlobal: true,
    }),
    // --- Connections ---
    DatabaseModule.forRoot(),

    // --- Modules ---
    AuthModule,
    UsersModule,
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
