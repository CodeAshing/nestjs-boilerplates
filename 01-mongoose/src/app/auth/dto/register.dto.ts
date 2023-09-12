import { IsNotEmpty } from '@nestjs/class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsEnum, IsOptional, IsString, Matches } from 'class-validator'
import { RoleEnum } from 'src/app/common/enum'

export class RegisterDTO {
  @ApiProperty({ description: 'email', example: 'example@test.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({ description: 'name', example: 'test' })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({ description: 'phone', example: '+923350000000' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  phone: string

  @ApiProperty({ description: 'address', example: 'H#ABC' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  address: string

  @ApiProperty({ description: 'role', example: RoleEnum })
  @IsNotEmpty()
  @IsEnum(RoleEnum)
  role: RoleEnum

  @ApiProperty({ description: 'password', example: `Opt1m1st1(` })
  @IsNotEmpty()
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string
}
