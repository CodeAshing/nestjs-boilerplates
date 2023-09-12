import { IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Types } from 'mongoose';

export class DeleteTodoDTO {
  @ApiProperty({ description: 'Username', example: '07030016' })
  @IsNotEmpty()
  @IsString()
  id: Types.ObjectId

}
