import { User } from './schema';
import {
  Body,
  Controller,
  Delete,
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
@Controller('user')
@ApiTags('user')
@UseGuards(JwtGuard)
@ApiBearerAuth('JWT-auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @ResponseMessage(responseEnum.USER_FOUND)
  @ApiResponse({
    status: 200,
    description: responseEnum.USER_FOUND,
  })
  @ApiResponse({
    status: 404,
    description: responseEnum.USER_NOT_FOUND,
  })
  @HttpCode(200)
  async getUser(@GetUser() userData: User): Promise<User> {
    return userData;
  }

  @Post()
  @Roles([RoleEnum.REGIONAL_DIRECTOR, RoleEnum.EMPLOYEE])
  @UseGuards(RolesGuard)
  @ResponseMessage(responseEnum.USER_CREATED)
  @ApiResponse({
    status: 201,
    description: responseEnum.USER_CREATED,
  })
  @HttpCode(201)
  async createUser(@Body() body: CreateClientDTO): Promise<any> {
    return await this.usersService.createUser(body);
  }

  @Put()
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
  async updateUser(@Body() body: UpdateClientDTO): Promise<any> {
    return await this.usersService.updateUser(body);
  }

  @Delete()
  @Roles([RoleEnum.REGIONAL_DIRECTOR, RoleEnum.EMPLOYEE])
  @UseGuards(RolesGuard)
  @ResponseMessage(responseEnum.USER_CREATED)
  @ApiResponse({
    status: 201,
    description: responseEnum.USER_CREATED,
  })
  @HttpCode(201)
  async deleteUser(@Body() body: CreateNonEmployeeDTO): Promise<any> {
    return await this.usersService.deleteUser(body);
  }

  @Get('get-all-users')
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
  async getAllUsers(): Promise<any> {
    return await this.usersService.getAllUsers();
  }
}
