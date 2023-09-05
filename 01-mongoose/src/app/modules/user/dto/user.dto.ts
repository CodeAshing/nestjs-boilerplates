import { IsNotEmpty } from '@nestjs/class-validator';
import * as mongoose from 'mongoose';

export class groupClientSaleDetailsDTODTO {
  @IsNotEmpty({ message: 'Please provide valid cnic' })
  cnic: string;

  @IsNotEmpty()
  otp: number;
}

export class authoritySaleDetailsDTO {
  @IsNotEmpty()
  token: string;
}

export class clientTokenDTO {
  @IsNotEmpty()
  tokenId: mongoose.Types.ObjectId;
}
