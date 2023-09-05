import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { connectionEnum } from 'src/app/common/enum';

import { responseEnum } from './enum';
import { Permission, PermissionDocument } from './schema';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission.name, connectionEnum.ERP)
    private readonly PermissionModel: Model<PermissionDocument>,
  ) {}

  async getPermissions(): Promise<any> {
    const permissions = await this.PermissionModel.find().catch((e) => {
      throw new InternalServerErrorException(e.message);
    });

    if (!permissions)
      throw new NotFoundException(responseEnum.PERMISSIONS_NOT_FOUND);

    return permissions;
  }

  async setPermissions(title: string): Promise<any> {
    const permissions = await this.PermissionModel.create({ title }).catch(
      (e) => {
        throw new NotFoundException(e.message);
      },
    );

    if (permissions) return permissions;

    throw new NotFoundException(responseEnum.PERMISSIONS_NOT_FOUND);
  }
}
