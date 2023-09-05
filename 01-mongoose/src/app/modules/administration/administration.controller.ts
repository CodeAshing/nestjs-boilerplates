import {
  Body,
  Controller,
  Get,
  Req,
  Post,
  Res,
  UseInterceptors,
  HttpCode,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/app/auth/guard';
import { ResponseMessage } from 'src/app/common/decorator';
import { AdministrationService } from './administration.service';
import { responseEnum } from './enum';

@Controller('administration')
@UseGuards(JwtGuard)
@ApiBearerAuth('JWT-auth')
@ApiTags('administration')
export class AdministrationController {
  private logger = new Logger('AdministrationController');
  constructor(private readonly administrationService: AdministrationService) {}

  // @Post('access-permission')
  // @ResponseMessage(responseEnum.ACCESS_PERMISSION_ADDED)
  // @HttpCode(200)
  // async accessPermission(@Body() body: any): Promise<any> {
  //   return await this.administrationService.accessPermission(body);
  // }

  // @Get('access-permission')
  // @HttpCode(200)
  // async getAccessPermission(@Body() body: any): Promise<any> {
  //   return await this.administrationService.getAccessPermission(body);
  // }

  // @Post('nationalHolidays')
  // @HttpCode(200)
  // async nationalHolidays(@Body() body: {}, @Res() res: Response): Promise<any> {
  //     return await this.administrationService.nationalHolidays(res, body);
  // }

  // @Post('removeNationalHolidays')
  // @HttpCode(200)
  // async removeNationalHolidays(
  //     @Body() body: {},
  //     @Res() res: Response,
  // ): Promise<any> {
  //     return await this.administrationService.removeNationalHolidays(res, body);
  // }

  // @Get('getAccessPermissions')
  // @HttpCode(200)
  // async getAccessPermissions(@Res() res: Response): Promise<any> {
  //     return await this.administrationService.getAccessPermissions(res);
  // }

  // @Get('getNationalHolidays')
  // @HttpCode(200)
  // async getNationalHolidays(@Res() res: Response): Promise<any> {
  //     return await this.administrationService.getNationalHolidays(res);
  // }
}
