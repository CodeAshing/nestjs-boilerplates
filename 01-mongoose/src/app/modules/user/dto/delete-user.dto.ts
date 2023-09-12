import { IsEmail, IsNotEmpty, IsOptional, ValidateNested } from '@nestjs/class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArrayOfObjects } from 'src/app/common/decorator'

export class DeleteUserDTO {
  @ApiProperty({ description: 'Username', example: '07030016' })
  @IsEmail()
  @IsNotEmpty()
  email: string
}
