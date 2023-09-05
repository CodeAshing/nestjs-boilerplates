import { Client, Employers } from './schema';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard, RolesGuard } from 'src/app/auth/guard';
import { GetUser, ResponseMessage, Roles } from 'src/app/common/decorator';
import { UsersService } from './user.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { responseEnum } from './enum';
import { RoleEnum } from 'src/app/common/enum';
import {
  CreateClientDTO,
  CreateNonEmployeeDTO,
  GetClientWithCNIC,
  GetDealerWithCnic,
  UpdateClientDTO,
  UpdateDealerDTO,
} from './dto';
@Controller('users')
@ApiTags('users')
@UseGuards(JwtGuard)
@ApiBearerAuth('JWT-auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('client-profile')
  @ResponseMessage(responseEnum.PROFILE_FOUND)
  @ApiResponse({
    status: 200,
    description: responseEnum.PROFILE_FOUND,
  })
  @ApiResponse({
    status: 404,
    description: responseEnum.PROFILE_NOT_FOUND,
  })
  @HttpCode(200)
  async client(@GetUser() userData: Client): Promise<any> {
    // Add fields validation here
    return await this.usersService.clientProfile(userData);
  }

  @Post('client')
  @Roles([RoleEnum.REGIONAL_DIRECTOR, RoleEnum.EMPLOYEE])
  @UseGuards(RolesGuard)
  @ResponseMessage(responseEnum.USER_CREATED)
  @ApiResponse({
    status: 201,
    description: responseEnum.USER_CREATED,
  })
  @HttpCode(201)
  async createClient(@Body() body: CreateClientDTO): Promise<any> {
    return await this.usersService.createClient(body);
  }

  @Put('client')
  @Roles([RoleEnum.REGIONAL_DIRECTOR, RoleEnum.EMPLOYEE])
  @UseGuards(RolesGuard)
  @ResponseMessage(responseEnum.USER_UPDATED)
  @ApiResponse({
    status: 200,
    description: responseEnum.USER_UPDATED,
  })
  @ApiResponse({
    status: 404,
    description: responseEnum.CLIENT_NOT_FOUND,
  })
  @ApiResponse({
    status: 500,
    description: responseEnum.USER_UPDATE_FAILED,
  })
  @HttpCode(200)
  async updateClient(@Body() body: UpdateClientDTO): Promise<any> {
    return await this.usersService.updateClient(body);
  }

  @Post('dealer')
  @Roles([RoleEnum.REGIONAL_DIRECTOR, RoleEnum.EMPLOYEE])
  @UseGuards(RolesGuard)
  @ResponseMessage(responseEnum.USER_CREATED)
  @ApiResponse({
    status: 201,
    description: responseEnum.USER_CREATED,
  })
  @HttpCode(201)
  async createDealer(@Body() body: CreateNonEmployeeDTO): Promise<any> {
    return await this.usersService.createDealer(body);
  }

  @Get('all-dealers')
  @Roles([RoleEnum.REGIONAL_DIRECTOR, RoleEnum.EMPLOYEE])
  @UseGuards(RolesGuard)
  @ResponseMessage(responseEnum.GET_ALL_USERS)
  @ApiResponse({
    status: 200,
    description: responseEnum.GET_ALL_USERS,
  })
  @ApiResponse({
    status: 500,
    description: responseEnum.DEALER_NOT_FOUND,
  })
  @HttpCode(200)
  async getAllDealers(): Promise<any> {
    return await this.usersService.getAllDealers();
  }

  @Put('dealer')
  @Roles([RoleEnum.REGIONAL_DIRECTOR, RoleEnum.EMPLOYEE])
  @UseGuards(RolesGuard)
  @ResponseMessage(responseEnum.USER_UPDATED)
  @ApiResponse({
    status: 200,
    description: responseEnum.USER_UPDATED,
  })
  @ApiResponse({
    status: 404,
    description: responseEnum.DEALER_NOT_FOUND,
  })
  @ApiResponse({
    status: 500,
    description: responseEnum.USER_UPDATE_FAILED,
  })
  @HttpCode(200)
  async updateDealer(@Body() body: UpdateDealerDTO): Promise<any> {
    return await this.usersService.updateDealer(body);
  }

  @Post('get-dealer-with-cnic')
  @Roles([RoleEnum.REGIONAL_DIRECTOR, RoleEnum.EMPLOYEE])
  @UseGuards(RolesGuard)
  @ResponseMessage(responseEnum.GET_USER)
  @ApiResponse({
    status: 200,
    description: responseEnum.GET_USER,
  })
  @HttpCode(200)
  async getDealerWithCnic(@Body() body: GetDealerWithCnic): Promise<any> {
    return await this.usersService.getDealerWithCnic(body);
  }

  @Get('dealers')
  @Roles([RoleEnum.REGIONAL_DIRECTOR, RoleEnum.EMPLOYEE])
  @UseGuards(RolesGuard)
  @ResponseMessage(responseEnum.GET_ALL_USERS)
  @ApiResponse({
    status: 200,
    description: responseEnum.GET_ALL_USERS,
  })
  @HttpCode(200)
  async getDealer(): Promise<any> {
    return await this.usersService.getDealers();
  }

  @Post('get-client-with-cnic')
  @HttpCode(200)
  async getClientWithCnic(@Body() body: GetClientWithCNIC): Promise<any> {
    return await this.usersService.getClientWithCnic(body);
  }

  @Roles([RoleEnum.REGIONAL_DIRECTOR, RoleEnum.EMPLOYEE])
  @UseGuards(RolesGuard)
  @ResponseMessage(responseEnum.GET_ALL_USERS)
  @ApiResponse({
    status: 200,
    description: responseEnum.GET_ALL_USERS,
  })
  @Get('employees')
  @HttpCode(200)
  async getEmployees(): Promise<any> {
    return await this.usersService.getEmployees();
  }

  @Get('get-all-dealers')
  @HttpCode(200)
  async getDealers(): Promise<any> {
    // const { cnic } = req['user'];
    return await this.usersService.getDealerWithName();
  }

  @Get('clients')
  @HttpCode(200)
  async getClients(): Promise<any> {
    return await this.usersService.getClients();
  }

  @Get('employee-profile')
  @ResponseMessage(responseEnum.GET_USER)
  @ApiResponse({
    status: 200,
    description: responseEnum.GET_USER,
  })
  @ApiResponse({
    status: 404,
    description: responseEnum.PERMISSIONS_NOT_FOUND,
  })
  @HttpCode(200)
  async getEmployeeProfile(@GetUser() userData: Employers): Promise<any> {
    return await this.usersService.getEmployeeProfile(userData);
  }
}
