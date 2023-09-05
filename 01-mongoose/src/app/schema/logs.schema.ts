import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type LogDocument = HydratedDocument<Log>;

@Schema({
  strict: true,
  timestamps: { createdAt: true, updatedAt: true },
  collection: 'logs',
})
export class Log {
  @Prop({ required: true, type: Types.ObjectId })
  record_id: Types.ObjectId; // The Record added in data base, e.g: Added a "Sale, Payment, Hold etc..""
  @Prop({ required: true })
  user: Types.ObjectId;
  @Prop({ required: true })
  status: string;
  @Prop({ required: true })
  event: string;
  @Prop({ required: true })
  description: string;
}

export const LogSchema = SchemaFactory.createForClass(Log);
