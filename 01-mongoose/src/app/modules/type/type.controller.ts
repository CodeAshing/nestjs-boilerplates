import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TypeService } from './type.service';
import { responseEnum } from './enum';
import { ResponseMessage } from 'src/app/common/decorator';

@Controller('type')
@ApiTags('Type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get()
  @ResponseMessage(responseEnum.GET_TYPES)
  @ApiResponse({
    status: 200,
    description: responseEnum.GET_TYPES,
  })
  @ApiResponse({
    status: 404,
    description: responseEnum.TYPES_NOT_FOUND,
  })
  @HttpCode(200)
  async getType(): Promise<any> {
    return await this.typeService.getType();
  }

  // @Post('setStatus')
  // @HttpCode(200)
  // async setStatus(@Body('title') title: string): Promise<any> {
  //   return await this.StatusService.setStatus(title);
  // }
}
