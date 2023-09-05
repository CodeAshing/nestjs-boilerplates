import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PermissionService } from './permission.service';
import { responseEnum } from './enum';
import { ResponseMessage } from 'src/app/common/decorator';

@Controller('permission')
@ApiTags('Permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) { }

  @Get()
  @ResponseMessage(responseEnum.GET_PERMISSIONS)
  @ApiResponse({
    status: 200,
    description: responseEnum.GET_PERMISSIONS,
  })
  @ApiResponse({
    status: 404,
    description: responseEnum.PERMISSIONS_NOT_FOUND,
  })
  @HttpCode(200)
  async getType(): Promise<any> {
    return await this.permissionService.getPermissions();
  }

  // @Post('setStatus')
  // @HttpCode(200)
  // async setStatus(@Body('title') title: string): Promise<any> {
  //   return await this.StatusService.setStatus(title);
  // }
}
