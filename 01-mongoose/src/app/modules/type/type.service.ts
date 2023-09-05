import { TypeDocument, Type } from './schema';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { connectionEnum } from 'src/app/common/enum';

import { responseEnum } from './enum';

@Injectable()
export class TypeService {
  constructor(
    @InjectModel(Type.name, connectionEnum.ERP)
    private readonly typeModel: Model<TypeDocument>,
  ) {}

  async getType(): Promise<any> {
    const types = await this.typeModel.find().catch((e) => {
      throw new InternalServerErrorException(e.message);
    });

    if (!types) throw new NotFoundException(responseEnum.TYPES_NOT_FOUND);

    return types;
  }

  async setType(title: string): Promise<any> {
    const type = await this.typeModel.create({ title }).catch((e) => {
      throw new NotFoundException(e.message);
    });

    if (type) return type;

    throw new NotFoundException(responseEnum.TYPES_NOT_FOUND);
  }
}
