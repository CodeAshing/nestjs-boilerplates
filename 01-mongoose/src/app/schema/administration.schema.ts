import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type AdministrationsDocument = HydratedDocument<Administrations>;

@Schema({
  strict: false,
  timestamps: { createdAt: true, updatedAt: true },
  collection: 'administration',
})
export class Administrations {}

export const AdministrationsSchema =
  SchemaFactory.createForClass(Administrations);
