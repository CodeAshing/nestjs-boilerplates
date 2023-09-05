import { Module } from '@nestjs/common';
import { TypeController } from './type.controller';
import { TypeService } from './type.service';
import { MongooseModule } from '@nestjs/mongoose';

import { connectionEnum } from 'src/app/common/enum';
import { Type, TypeSchema } from './schema';
@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Type.name, schema: TypeSchema }],
      connectionEnum.ERP,
    ),
  ],
  controllers: [TypeController],
  providers: [TypeService],
})
export class TypeModule {}
