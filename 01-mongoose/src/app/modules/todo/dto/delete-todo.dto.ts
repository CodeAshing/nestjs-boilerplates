import { IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Types } from 'mongoose'

export class DeleteTodoDTO {
  @ApiProperty({ description: 'id', example: '6500cc53a7b91b788717134f' })
  @IsNotEmpty()
  @IsString()
  id: Types.ObjectId
}
