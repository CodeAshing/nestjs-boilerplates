import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArrayOfObjects } from 'src/app/common/decorator';

class AdditionalInformation {
  @ApiProperty({ example: 4220106968754 })
  @IsNotEmpty()
  CNIC: number;

  @ApiProperty({ example: 'xyz' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '+<countryCode><Number> e.g: +923130185010' })
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty({ message: 'Please provide valid address' })
  @ApiProperty({ example: '5th street, Newtown' })
  address: string;
}

export class CreateNonEmployeeDTO {
  @IsNotEmpty({ message: 'Please provide valid name' })
  name: string;

  @IsNotEmpty({ message: 'Please provide valid phone' })
  phone: string;

  @IsNotEmpty({ message: 'Please provide valid email' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Please provide valid CNIC' })
  @IsNumber()
  CNIC: number;

  @ApiProperty({ example: 'xyz' })
  @IsNotEmpty({ message: 'Please provide valid agency' })
  agency: string;

  @ApiProperty({ example: 'xyz' })
  @IsNotEmpty({ message: 'Please provide valid Lead Source' })
  leadSource: string;

  @ApiProperty({ example: 'xyz' })
  @IsNotEmpty({ message: 'Please provide valid address' })
  address: string;

  @ApiProperty({ example: 'xyz' })
  @IsNotEmpty({ message: 'Please provide valid country' })
  country: string;

  @ApiProperty({ example: 'xyz' })
  @IsNotEmpty({ message: 'Please provide valid state' })
  state: string;

  @ApiProperty({ example: 'xyz' })
  @IsNotEmpty({ message: 'Please provide valid city' })
  city: string;

  @ApiProperty({ example: 'false/true', type: Boolean })
  @IsNotEmpty({ message: 'Please provide valid active' })
  @IsBoolean()
  active: boolean;

  @IsOptional({ message: `Please provide valid "Additional Information"` })
  @Type(() => AdditionalInformation)
  @ValidateNested()
  @IsArrayOfObjects()
  @ApiProperty({ type: [AdditionalInformation] })
  additionalInformation: AdditionalInformation[];
}

export class UpdateDealerDTO {
  @ApiProperty({ example: 423423423423411 })
  @IsNotEmpty({ message: 'Please provide valid CNIC' })
  @IsNumber()
  CNIC: number;

  @ApiProperty({ example: 'xyz' })
  @IsOptional({ message: 'Please provide valid name' })
  name: string;

  @ApiProperty({ example: '+923130185020' })
  @IsOptional({ message: 'Please provide valid phone' })
  phone: string;

  @ApiProperty({ example: 'xyz' })
  @IsOptional({ message: 'Please provide valid email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'xyz' })
  @IsOptional({ message: 'Please provide valid agency' })
  agency: string;

  @ApiProperty({ example: 'xyz' })
  @IsOptional({ message: 'Please provide valid leadSource' })
  leadSource: string;

  @ApiProperty({ example: 'xyz' })
  @IsOptional({ message: 'Please provide valid address' })
  address: string;

  @ApiProperty({ example: 'xyz' })
  @IsOptional({ message: 'Please provide valid country' })
  country: string;

  @ApiProperty({ example: 'xyz' })
  @IsOptional({ message: 'Please provide valid state' })
  state: string;

  @ApiProperty({ example: 'xyz' })
  @IsOptional({ message: 'Please provide valid city' })
  city: string;

  @ApiProperty({ example: 'false/true', type: Boolean })
  @IsOptional({ message: 'Please provide valid active' })
  @IsBoolean()
  active: boolean;

  @IsOptional({ message: `Please provide valid "Additional Information"` })
  @Type(() => AdditionalInformation)
  @ValidateNested()
  @IsArrayOfObjects()
  @ApiProperty({ type: [AdditionalInformation] })
  additionalInformation: AdditionalInformation[];
}

export class GetDealerWithCnic {
  @ApiProperty({ example: 423423423423411 })
  @IsNotEmpty({ message: 'Please provide valid cnic' })
  @IsNumber()
  CNIC: number;
}
