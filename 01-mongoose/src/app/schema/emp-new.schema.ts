import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmpNewDocument = EmpNew & Document;

@Schema({
  strict: false,
  timestamps: { createdAt: true, updatedAt: true },
  collection: 'employees',
})
export class EmpNew {}

export const EmpNewSchema = SchemaFactory.createForClass(EmpNew);
