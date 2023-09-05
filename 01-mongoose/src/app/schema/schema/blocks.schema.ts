import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Blocks extends Document {
  @Prop({ required: true })
  blockTitle: string;

  @Prop({
    required: true,
    type: {
      floorTitle: String,
      unitNo: [
        {
          basePrice: String,
          name: String,
          no: String,
          contact: String,
          extrasRoadFacing: String,
          extrasWestOpen: String,
          extrasCorner: String,
        },
      ],
    },
  })
  floors: {
    floorTitle: string;
    unitNo: [
      {
        basePrice: string;
        name: string;
        no: string;
        contact: string;
        extrasRoadFacing: number;
        extrasWestOpen: number;
        extrasCorner: number;
      },
    ];
  };
}
