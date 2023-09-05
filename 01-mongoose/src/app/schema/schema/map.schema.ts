import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Categories } from '.';

export type MapDocument = Map & Document;

@Schema({
  strict: false,
  timestamps: { createdAt: true, updatedAt: true },
  collection: 'map',
})
export class Map {
  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    unique: true,
  })
  projectRef: Types.ObjectId;

  // @Prop({ required: false })
  // categories: any;

  @Prop({ required: true, type: Categories })
  categories: Categories;
}

export const MapSchema = SchemaFactory.createForClass(Map);
