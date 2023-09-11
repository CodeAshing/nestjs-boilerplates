import { JwtStrategy, RefreshTokenStrategy } from './guard'
import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { MongooseModule } from '@nestjs/mongoose'

import { ConfigModule } from 'src/config/config.module'
import { connectionEnum } from 'src/app/common/enum'

import { CacheModule } from '@nestjs/cache-manager'
import { Helper } from 'src/app/common/helper/utilities.helper'
import { JwtModule } from '@nestjs/jwt'
import { User, UserSchema } from '../modules/user/schema'

@Module({
  imports: [
    CacheModule.register(),
    ConfigModule,
    JwtModule.register({}),
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      connectionEnum.ERP,
    ),
  ],
  controllers: [AuthController],
  providers: [AuthService, RefreshTokenStrategy, JwtStrategy, Helper],
  exports: [AuthService],
})
export class AuthModule {}
