import { IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateUserDTO {
  @ApiProperty({ description: 'Username', example: '07030016' })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({ description: 'Username', example: '07030016' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  phone: string

  @ApiProperty({ description: 'Username', example: '07030016' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  address: string
}
