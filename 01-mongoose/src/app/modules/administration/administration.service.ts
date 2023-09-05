import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { connectionEnum } from 'src/app/common/enum';
import { recordTypeEnum, responseEnum } from './enum';

@Injectable()
export class AdministrationService {
  private logger = new Logger('AdministrationService');
  // constructor(
  //   @InjectModel(AccessPermission.name, connectionEnum.ERP)
  //   private permissionModel: Model<AccessPermissionDocument>,
  // ) {}

  // async accessPermission(body: any): Promise<any> {
  //   const permission = await this.permissionModel.create(body).catch((e) => {
  //     throw new InternalServerErrorException(e);
  //   });

  //   return permission;
  // }

  // async getAccessPermission(body: any): Promise<any> {
  //   const permissions = await this.permissionModel.find().catch((e) => {
  //     throw new InternalServerErrorException(e);
  //   });

  //   if (permissions.length === 0)
  //     throw new NotFoundException(responseEnum.ACCESS_PERMISSIONS_NOT_FOUND);
  //   return permissions;
  // }
}
