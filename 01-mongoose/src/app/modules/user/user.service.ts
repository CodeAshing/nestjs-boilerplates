import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { RoleEnum, connectionEnum } from 'src/app/common/enum'

import { User, UserDocument } from 'src/app/modules/user/schema'
import { responseEnum } from './enum'
import { UpdateUserDTO } from './dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name, connectionEnum.database)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async deleteUser(email: string): Promise<any> {
    const exists = await this.userModel.exists({ email, role: RoleEnum.USER })

    if (!exists)
      throw new BadRequestException(responseEnum.USER_NOT_FOUND_CAN_NOT_DELETED)

    await this.userModel.deleteOne({ email, role: RoleEnum.USER })

    return null
  }

  async updateUser(body: UpdateUserDTO, email: string): Promise<any> {
    const user = await this.userModel.findOneAndUpdate({ email }, body, {
      upsert: false,
    })

    if (!user) throw new ConflictException(responseEnum.USER_UPDATE_FAILED)
    return null
  }

  async getAllUsers(): Promise<any> {
    return this.userModel.find().select({ password: 0 })
  }
}
