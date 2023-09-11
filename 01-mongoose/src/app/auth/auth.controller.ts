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
import { Response, Request } from 'express';
import { GetUser, ResponseMessage } from '../common/decorator';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './dto';
import { JwtGuard, RefreshTokenGuard } from './guard';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { responseEnum } from './enum';
import { User } from '../modules/user/schema';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ResponseMessage(responseEnum.LOGIN)
  @ApiResponse({
    status: 200,
    description: responseEnum.LOGIN,
  })
  @HttpCode(200)
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() payload: LoginDTO,
  ): Promise<any> {
    return await this.authService.login(response, payload);
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
  async tokenRefresh(@GetUser() { email }: User,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    return await this.authService.tokenRefresh(email, response);
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
    @GetUser() { email }: User,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    return await this.authService.logout(email, request, response);
  }

  @Post('register')
  @ResponseMessage(responseEnum.REGISTER)
  @ApiResponse({
    status: 200,
    description: responseEnum.REGISTER,
  })
  @HttpCode(200)
  async register(
    @Res({ passthrough: true }) response: Response,
    @Body() body: RegisterDTO,
  ): Promise<any> {
    return await this.authService.register(body, response);
  }
}
