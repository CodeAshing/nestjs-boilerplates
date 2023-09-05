import { JwtStrategy, RefreshTokenStrategy } from './guard';
import { Module, CacheModule } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express/multer/multer.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from 'src/config/config.module';
import { connectionEnum } from 'src/app/common/enum';

import { Helper } from 'src/app/common/helper/utilities.helper';
import { JwtModule } from '@nestjs/jwt';
import {
  SummarySchema,
  Employers,
  EmployersSchema,
  Summary,
  Administration,
  AdministrationSchema,
  RoleSchema,
  Role,
} from '../schema';
import { Auth, AuthSchema, Client, ClientSchema } from '../modules/user/schema';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({}),
    MongooseModule.forFeature(
      [
        { name: Client.name, schema: ClientSchema },
        { name: Auth.name, schema: AuthSchema },
        { name: Employers.name, schema: EmployersSchema },
        { name: Role.name, schema: RoleSchema },
      ],
      connectionEnum.ERP,
    ),
    MulterModule.register(),
  ],
  controllers: [AuthController],
  providers: [AuthService, RefreshTokenStrategy, JwtStrategy, Helper],
  exports: [AuthService],
})
export class AuthModule { }
