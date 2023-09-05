import { IsNotEmpty, IsOptional } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NextToKinDTO {
  @ApiProperty({ example: 4220106968754 })
  @IsNotEmpty()
  CNIC: number;

  @ApiProperty({ example: 'xyz' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Uncle,Son,Father, etc...' })
  @IsNotEmpty()
  relation: string;

  @ApiProperty({ example: '+<countryCode><Number> e.g: +923130185010' })
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty({ message: 'Please provide valid address' })
  @ApiProperty({ example: '5th street, Newtown' })
  address: string;
}
