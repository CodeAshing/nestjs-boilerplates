import { IsNotEmpty } from '@nestjs/class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator'
import { RoleEnum } from 'src/app/common/enum'

export class RegisterDTO {
  @ApiProperty({ description: 'Username', example: '07030016' })
  @IsEmail()
  @IsNotEmpty()
  email: string

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

  @ApiProperty({ description: 'Username', example: '07030016' })
  @IsNotEmpty()
  @IsEnum(RoleEnum)
  role: RoleEnum

  @ApiProperty({ description: 'Username', example: '07030016' })
  @IsNotEmpty()
  @IsString()
  //   @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //     message: 'Password is too weak',
  //   })
  password: string
}
