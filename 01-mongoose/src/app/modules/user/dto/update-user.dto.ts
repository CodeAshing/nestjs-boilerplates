import { IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateUserDTO {
  @ApiProperty({ description: 'name', example: 'test' })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({ description: 'phone', example: '+923350000000' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  phone: string

  @ApiProperty({ description: 'address', example: 'H#abc' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  address: string
}
