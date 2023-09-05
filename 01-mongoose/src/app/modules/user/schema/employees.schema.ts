import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Role } from 'src/app/schema';

export type EmployersDocument = HydratedDocument<Employers>;

@Schema({
  strict: true,
  timestamps: true,
  collection: 'employees',
})
export class Employers {
  @Prop({ required: true, unique: true })
  empCode: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  designation: string;

  @Prop({ required: true })
  department: string;

  @Prop({ required: true })
  active: boolean;


  @Prop({ required: true, type: { erp: String } })
  role: { erp: string };
}

export const EmployersSchema = SchemaFactory.createForClass(Employers);
