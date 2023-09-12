import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from '@nestjs/class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArrayOfObjects } from 'src/app/common/decorator'

export class DeleteUserDTO {
  @ApiProperty({ description: 'email', example: 'test@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string
}
