import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';

import { connectionEnum } from 'src/app/common/enum';
import { User, UserSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: User.name, schema: UserSchema },
      ],
      connectionEnum.ERP,
    ),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
