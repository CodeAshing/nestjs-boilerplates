import { IsNotEmpty } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmployeeWebLoginDTO {
  @IsNotEmpty({ message: 'Please provide username' })
  @ApiProperty({ description: 'Username', example: '07030016' })
  username: string;

  @IsNotEmpty({ message: 'Please provide password' })
  @ApiProperty({ description: 'Password', example: '123456' })
  //   @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //     message: 'Password is too weak',
  //   })
  password: string;
}
