import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { connectionEnum } from 'src/app/common/enum';

import { User, UserDocument } from 'src/app/modules/user/schema';
import { responseEnum } from './enum';
import { CreateClientDTO,  UpdateClientDTO } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name, connectionEnum.ERP)
    private readonly userModel: Model<UserDocument>,
  ) { }

  async createUser(body: CreateClientDTO): Promise<any> {
    const exists = await this.userModel
      .exists({ CNIC: body.CNIC })
      .catch((e) => {
        throw new InternalServerErrorException(e);
      });
    if (exists)
      throw new InternalServerErrorException(responseEnum.USERS_ALREADY_EXISTS);

    const client = await this.userModel.create(body).catch((e) => {
      throw new InternalServerErrorException(e);
    });
    return { client: client._id };
  }

  async deleteUser(body: any): Promise<any> {
    const exists = await this.userModel
      .exists({ CNIC: body.CNIC })
      .catch((e) => {
        throw new InternalServerErrorException(e);
      });
    if (exists)
      throw new InternalServerErrorException(responseEnum.USERS_ALREADY_EXISTS);

    const dealer = await this.userModel.create(body).catch((e) => {
      throw new InternalServerErrorException(e);
    });
    return { dealer: dealer._id };
  }

  async updateUser(body: UpdateClientDTO): Promise<any> {
    const exists = await this.userModel.exists({ CNIC: body.CNIC });
    if (!exists) throw new NotFoundException(responseEnum.USER_NOT_FOUND);

    const client = await this.userModel
      .findOneAndReplace({ CNIC: body.CNIC }, body, { upsert: false })
      .catch((e) => {
        throw new InternalServerErrorException(e);
      });

    if (!client) throw new ConflictException(responseEnum.USER_UPDATE_FAILED);
    return;
  }

  async getAllUsers(): Promise<any> {
    const dealers = await this.userModel.find();

    return dealers;
  }

}
