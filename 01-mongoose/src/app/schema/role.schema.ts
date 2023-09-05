import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

@Schema({
  strict: true,
  timestamps: { createdAt: true, updatedAt: true },
  collection: 'roles',
})
export class Role {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  code: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
