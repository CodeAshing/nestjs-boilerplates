import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from '@nestjs/class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsString, isNotEmpty } from 'class-validator'
import { IsArrayOfObjects } from 'src/app/common/decorator'

export class AddTodoDTO {
  @ApiProperty({ description: 'Username', example: '07030016' })
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty({ description: 'Username', example: '07030016' })
  @IsString()
  @IsNotEmpty()
  description: string
}
