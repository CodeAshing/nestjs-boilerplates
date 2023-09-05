import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type TypeDocument = Type & Document;

@Schema({
  strict: true,
  timestamps: { createdAt: true, updatedAt: true },
  collection: 'types',
})
export class Type {
  @Prop({ required: true })
  title: string;
}

export const TypeSchema = SchemaFactory.createForClass(Type);
