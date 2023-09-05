import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type SummaryDocument = Summary & Document;

@Schema({
  strict: true,
  timestamps: { createdAt: true, updatedAt: true },
  collection: 'summary',
})
export class Summary {
  receivedBy: Types.ObjectId;

  @Prop({ required: true })
  EmpCode: string;
  @Prop({ required: true, type: Object })
  summary: any;
  @Prop({ required: true, type: Object })
  wallet: any;
  @Prop({ required: true, type: Object })
  leaves: any;

  // @Prop({ required: true })
  // tickets: {
  // @Prop({ required: true })
  // type: [
  //     {
  //       region: { type: String, required: true },
  //       department: { type: String, required: true },
  //       title: { type: String, required: true },
  //       message: { type: String, required: true },
  //       date: { type: String, required: true },
  //       time: { type: String, required: true },
  //       from: {
  //         type: {
  //           empCode: String,
  //           designation: String,
  //         },
  //         required: true,
  //       },
  //     },
  //   ],
  //   required: false,
  // },
}

export const SummarySchema = SchemaFactory.createForClass(Summary);
