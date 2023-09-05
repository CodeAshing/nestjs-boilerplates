import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;

class Device extends Document {
  @Prop({ required: true })
  token: string;
}

@Schema({
  strict: true,
  timestamps: { createdAt: true, updatedAt: true },
  collection: 'auths',
})
export class Auth {
  @Prop({ required: true })
  pin: string;

  @Prop({ required: true })
  empCode: string;

  @Prop({ required: true })
  device: Device;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
