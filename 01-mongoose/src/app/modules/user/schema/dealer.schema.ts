import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type AdditionalInformationDocument = AdditionalInformation & Document;
@Schema({ _id: false })
class AdditionalInformation extends Document {
  @Prop({ required: true })
  CNIC: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  email: string;

  @Prop({ required: false })
  phone: string;

  @Prop({ required: false })
  address: string;
}
const AdditionalInformationSchema = SchemaFactory.createForClass(
  AdditionalInformation,
);

export type DealerDocument = Dealer & Document;

@Schema({
  strict: true,
  timestamps: { createdAt: true, updatedAt: true },
  collection: 'dealers',
})
export class Dealer {
  @Prop({ required: true, unique: true })
  CNIC: number;

  @Prop({ required: true })
  active: boolean;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  agency: string;

  @Prop({ required: true })
  leadSource: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: false, type: [AdditionalInformationSchema] })
  additionalInformation: AdditionalInformationDocument[];
}

export const DealerSchema = SchemaFactory.createForClass(Dealer);
