import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';

import { connectionEnum } from 'src/app/common/enum';
import { ResponseObject } from 'src/app/common/helper/response-object.helper';

import { Log, LogSchema, Employers, EmployersSchema } from 'src/app/schema';
import { Type, TypeSchema } from '../type/schema';
import { Permission, PermissionSchema } from '../permission/schema';
import { Client, ClientSchema, Dealer, DealerSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Client.name, schema: ClientSchema },
        { name: Log.name, schema: LogSchema },
        { name: Type.name, schema: TypeSchema },
        { name: Permission.name, schema: PermissionSchema },
        { name: Dealer.name, schema: DealerSchema },
        { name: Employers.name, schema: EmployersSchema },
      ],
      connectionEnum.ERP,
    ),
  ],
  controllers: [UsersController],
  providers: [UsersService, ResponseObject],
})
export class UsersModule { }
