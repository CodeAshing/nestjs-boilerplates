import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { connectionEnum } from 'src/app/common/enum';
import { AdministrationController } from './administration.controller';
import { AdministrationService } from './administration.service';
@Module({
  imports: [],
  controllers: [AdministrationController],
  providers: [AdministrationService],
  exports: [AdministrationService],
})
export class AdministrationModule {}
