import {
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArrayOfObjects } from 'src/app/common/decorator';
import { NextToKinDTO } from '.';

export class UpdateClientDTO {
  @IsNotEmpty({ message: 'Please provide valid CNIC' })
  @IsNotEmpty()
  CNIC: string;

  @IsNotEmpty({ message: 'Please provide valid name' })
  @ApiProperty({ example: 'xyz' })
  name: string;

  @IsNotEmpty({ message: 'Please provide valid phone' })
  @ApiProperty({ example: '+<countryCode><Number> e.g: +923130185010' })
  phone: string;

  @IsNotEmpty({ message: 'Please provide valid email' })
  @ApiProperty({ example: 'xyz@email.com' })
  email: string;

  @IsNotEmpty({
    message: 'Please provide valid clientSalutation/preSalutation',
  })
  @ApiProperty({ example: 'S/O' })
  clientSalutation: string;

  @IsNotEmpty({
    message: 'Please provide valid relationSalutation/postSalutation',
  })
  @ApiProperty({ example: 'S/O' })
  relationSalutation: string;

  @IsNotEmpty({ message: 'Please provide valid leadSource' })
  @ApiProperty({ example: 'Advertisement' })
  leadSource: string;

  @IsNotEmpty({ message: 'Please provide valid salutantName/relation' })
  @ApiProperty({ example: 'Father name, mother name' })
  relation: string;

  @IsNotEmpty({ message: 'Please provide valid city' })
  @ApiProperty({ example: 'Karachi' })
  city: string;

  @IsNotEmpty({ message: 'Please provide valid address' })
  @ApiProperty({ example: '5th street, Newtown' })
  address: string;

  @IsNotEmpty({ message: 'Please provide valid country' })
  @ApiProperty({ example: 'Pakistan' })
  country: string;

  @IsNotEmpty({ message: 'Please provide valid country' })
  @ApiProperty({ example: 'Sindh' })
  state: string;

  @IsOptional({ message: 'Please provide valid NextToKin' })
  @Type(() => NextToKinDTO)
  @ValidateNested()
  @IsArrayOfObjects()
  @ApiProperty({ type: [NextToKinDTO] })
  nextToKin: NextToKinDTO[];
}
