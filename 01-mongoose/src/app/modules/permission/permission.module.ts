import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { MongooseModule } from '@nestjs/mongoose';

import { connectionEnum } from 'src/app/common/enum';
import { Permission, PermissionSchema } from './schema';
@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Permission.name, schema: PermissionSchema }],
      connectionEnum.ERP,
    ),
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
