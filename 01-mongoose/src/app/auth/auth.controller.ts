import {
  Body,
  Controller,
  Get,
  Req,
  Post,
  Res,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
import { Response, Request } from 'express';
import { GetUser, ResponseMessage } from '../common/decorator';
import { AuthService } from './auth.service';
import { EmployeeWebLoginDTO } from './dto';
import { JwtGuard, RefreshTokenGuard } from './guard';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { responseEnum } from './enum';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('employee-web-login')
  @ResponseMessage(responseEnum.EMPLOYEE_WEB_LOGIN)
  @ApiResponse({
    status: 200,
    description: responseEnum.EMPLOYEE_WEB_LOGIN,
  })
  @HttpCode(200)
  async employeeWebLogin(
    @Res({ passthrough: true }) response: Response,
    @Body() payload: EmployeeWebLoginDTO,
  ): Promise<any> {
    return await this.authService.employeeWebLogin(response, payload);
  }

  @UseGuards(JwtGuard)
  @UseGuards(RefreshTokenGuard)
  @ResponseMessage(responseEnum.TOKEN_REFRESH_SUCCESSFULLY)
  @ApiResponse({
    status: 200,
    description: responseEnum.TOKEN_REFRESH_SUCCESSFULLY,
  })
  @Get('refresh-token')
  @HttpCode(200)
  async tokenRefresh(@GetUser() userData: any): Promise<any> {
    return await this.authService.tokenRefresh(userData?.empCode);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('logout')
  @ResponseMessage(responseEnum.LOGOUT)
  @ApiResponse({
    status: 200,
    description: responseEnum.LOGOUT,
  })
  @HttpCode(200)
  async logout(
    @GetUser() userData: any,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    return await this.authService.logout(userData?.empCode, request, response);
  }
}
