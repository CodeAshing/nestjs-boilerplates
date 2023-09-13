import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployerDto } from './create-employer.dto';

export class UpdateEmployerDto extends PartialType(CreateEmployerDto) {}
