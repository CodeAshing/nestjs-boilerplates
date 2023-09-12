import { IsNotEmpty, Matches } from '@nestjs/class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDTO {
  @IsNotEmpty({ message: 'Please provide email' })
  @ApiProperty({ description: 'body', example: 'test@example.com' })
  email: string

  @IsNotEmpty({ message: 'Please provide password' })
  @ApiProperty({ description: 'Password', example: '123456' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string
}
