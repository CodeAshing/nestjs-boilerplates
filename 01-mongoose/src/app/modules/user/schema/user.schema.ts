import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { RoleEnum } from 'src/app/common/enum'
export type UserDocument = HydratedDocument<User>

@Schema({
  strict: true,
  timestamps: true,
  collection: 'users',
})
export class User {
  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  phone: string

  @Prop({ required: true })
  address: string

  @Prop({ required: true })
  role: RoleEnum

  @Prop({ required: true })
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User)
