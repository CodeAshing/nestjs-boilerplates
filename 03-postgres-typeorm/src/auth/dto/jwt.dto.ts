import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class JwtDto {
  @ApiProperty()
  @IsString()
  jwt: string;
}
