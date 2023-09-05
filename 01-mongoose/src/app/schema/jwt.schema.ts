import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type JWTDocument = JWT & Document;

@Schema({
  strict: true,
  timestamps: { createdAt: true, updatedAt: true },
  collection: 'notificationAndSupport',
})
export class JWT {
  @Prop({ required: true })
  recordType: string;

  @Prop({ required: false, type: Object })
  jwtTokens: any;
}

export const JWTSchema = SchemaFactory.createForClass(JWT);
