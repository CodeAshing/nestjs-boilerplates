import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  ValidateNested,
} from '@nestjs/class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { IsArrayOfObjects } from 'src/app/common/decorator';

export class SecondTierPermissions {
  @ApiProperty({ example: 'generalInformation' })
  @IsNotEmpty()
  permissionSubType: string;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  canView: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  canCreate: boolean;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  canUpdate: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  canDelete: boolean;
}

export class FirstTierPermissionsDTO {
  @ApiProperty({ example: 'profile' })
  @IsNotEmpty()
  category: string;

  @Type(() => SecondTierPermissions)
  @ValidateNested()
  @IsArrayOfObjects()
  @ApiProperty({ type: [SecondTierPermissions] })
  permissions: SecondTierPermissions[];
}

export class AccessPermissionsDTO {
  @Type(() => FirstTierPermissionsDTO)
  @ValidateNested()
  @IsArrayOfObjects()
  @ApiProperty({ type: [FirstTierPermissionsDTO] })
  permissions: FirstTierPermissionsDTO[];

  @ApiProperty({ example: 'Role' })
  @IsNotEmpty()
  role: string;
}
