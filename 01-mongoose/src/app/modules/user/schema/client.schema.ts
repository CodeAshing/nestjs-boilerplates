import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type ClientDocument = Client & Document;

type NextToKinDocument = HydratedDocument<NextToKin>;
@Schema({ _id: false })
class NextToKin extends Document {
  @Prop({ required: true })
  CNIC: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  relation: string;

  @Prop({ required: false })
  email: string;

  @Prop({ required: false })
  phone: string;

  @Prop({ required: false })
  address: string;
}
const NextToKinSchema = SchemaFactory.createForClass(NextToKin);

@Schema({
  strict: true,
  timestamps: { createdAt: true, updatedAt: true },
  collection: 'clients',
})
export class Client {
  @Prop({ required: false })
  name: string;

  @Prop({ required: true })
  clientSalutation: string;

  @Prop({ required: true })
  relationSalutation: string;

  @Prop({ required: true })
  relation: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, unique: true })
  CNIC: number;

  @Prop({ required: true })
  leadSource: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: false, type: [NextToKinSchema], default: [] })
  nextToKin: NextToKinDocument[];
}

export const ClientSchema = SchemaFactory.createForClass(Client);
