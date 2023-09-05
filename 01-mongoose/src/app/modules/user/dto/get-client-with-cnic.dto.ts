import { IsNotEmpty } from '@nestjs/class-validator';

export class GetClientWithCNIC {
  @IsNotEmpty()
  CNIC: number;
}
