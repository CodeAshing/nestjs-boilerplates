import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type CategoriesDocument = Categories & Document;

@Schema({
  strict: true,
  timestamps: { createdAt: true, updatedAt: true },
  collection: 'categories',
})
export class Categories {
  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
  })
  projectId: Types.ObjectId;

  // @Prop({ required: true })
  // types: {
  //   type: [
  //     {
  //       type: {},
  //       required: true,
  //     },
  //   ],
  //   required: true,
  // }
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);
