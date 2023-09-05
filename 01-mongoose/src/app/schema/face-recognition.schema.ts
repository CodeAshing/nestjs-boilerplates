import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type FaceRecognitionDocument = FaceRecognition & Document;

@Schema({
  strict: true,
  timestamps: { createdAt: true, updatedAt: true },
  collection: 'faceRecognition',
})
export class FaceRecognition {
  @Prop({ required: true })
  RekognitionId: string;
  @Prop({ required: true })
  empCode: string;
}

export const FaceRecognitionSchema =
  SchemaFactory.createForClass(FaceRecognition);
