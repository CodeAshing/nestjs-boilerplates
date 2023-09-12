import { User } from './schema'
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
} from '@nestjs/common'
import { JwtGuard, RolesGuard } from 'src/app/auth/guard'
import { GetUser, ResponseMessage, Roles } from 'src/app/common/decorator'
import { UsersService } from './user.service'
import { ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { responseEnum } from './enum'
import { RoleEnum } from 'src/app/common/enum'
import { DeleteUserDTO, UpdateUserDTO } from './dto'
@Controller('user')
@ApiTags('user')
@UseGuards(JwtGuard)
@ApiCookieAuth('api-auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
    return userData
  }

  @Put()
  @ResponseMessage(responseEnum.USER_UPDATED)
  @ApiResponse({
    status: 200,
    description: responseEnum.USER_UPDATED,
  })
  @ApiResponse({
    status: 404,
    description: responseEnum.USER_NOT_FOUND,
  })
  @ApiResponse({
    status: 500,
    description: responseEnum.USER_UPDATE_FAILED,
  })
  @HttpCode(200)
  async updateUser(
    @Body() body: UpdateUserDTO,
    @GetUser() { email }: User,
  ): Promise<null> {
    return this.usersService.updateUser(body, email)
  }

  @Delete()
  @Roles([RoleEnum.ADMIN])
  @UseGuards(RolesGuard)
  @ResponseMessage(responseEnum.USER_DELETED)
  @ApiResponse({
    status: 201,
    description: responseEnum.USER_DELETED,
  })
  @HttpCode(201)
  async deleteUser(@Body() { email }: DeleteUserDTO): Promise<null> {
    return await this.usersService.deleteUser(email)
  }

  @Get('get-all-users')
  @Roles([RoleEnum.ADMIN])
  @UseGuards(RolesGuard)
  @ResponseMessage(responseEnum.GET_ALL_USERS)
  @ApiResponse({
    status: 200,
    description: responseEnum.GET_ALL_USERS,
  })
  @HttpCode(200)
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.getAllUsers()
  }
}
