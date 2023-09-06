import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';

import { connectionEnum } from 'src/app/common/enum';
import { ResponseObject } from 'src/app/common/helper/response-object.helper';

import { Log, LogSchema } from 'src/app/schema';
import { User, UserSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: User.name, schema: UserSchema },
        { name: Log.name, schema: LogSchema },
      ],
      connectionEnum.ERP,
    ),
  ],
  controllers: [UsersController],
  providers: [UsersService, ResponseObject],
})
export class UsersModule { }
