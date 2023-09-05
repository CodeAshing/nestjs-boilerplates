import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Blocks } from '.';

export class Categories extends Document {
  @Prop({ type: [Blocks] })
  shops: Blocks[];

  @Prop({ type: [Blocks] })
  apartments: Blocks[];

  @Prop({ type: [Blocks] })
  offices: Blocks[];

  @Prop({ type: [Blocks] })
  houses: Blocks[];

  @Prop({ type: [Blocks] })
  plots: Blocks[];

  @Prop({ type: [Blocks] })
  penthouses: Blocks[];

  @Prop({ type: [Blocks] })
  warehouses: Blocks[];

  @Prop({ type: [Blocks] })
  hotelRooms: Blocks[];
}
