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
  @ApiProperty({ description: 'title', example: 'test' })
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty({ description: 'description', example: 'test' })
  @IsString()
  @IsNotEmpty()
  description: string
}
