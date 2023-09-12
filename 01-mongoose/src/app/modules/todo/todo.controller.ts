import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post, Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { TodoService } from './todo.service'
import { responseEnum } from './enum'
import { GetUser, ResponseMessage } from 'src/app/common/decorator'
import { AddTodoDTO, DeleteTodoDTO } from './dto'
import { JwtGuard } from 'src/app/auth/guard'
import { User } from '../user/schema'
import { Todo } from './schema'

@Controller('todo')
@ApiTags('Todo')
@UseGuards(JwtGuard)
@ApiBearerAuth('JWT-auth')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Get()
  @ResponseMessage(responseEnum.GET_TODO)
  @ApiResponse({
    status: 200,
    description: responseEnum.GET_TODO,
  })
  @ApiResponse({
    status: 404,
    description: responseEnum.TODO_NOT_FOUND,
  })
  @HttpCode(200)
  async getTodo(
    @GetUser() { email }: User
  ): Promise<Todo[]> {
    return await this.todoService.getTodo(email)
  }

  @Post()
  @ResponseMessage(responseEnum.TODO_ADD)
  @ApiResponse({
    status: 200,
    description: responseEnum.TODO_ADD,
  })
  @HttpCode(200)
  async setTodo(@Body() body: AddTodoDTO,
    @GetUser() { email }: User,
  ): Promise<null> {
    return await this.todoService.setTodo(body, email)
  }


  @Delete()
  @ResponseMessage(responseEnum.TODO_DELETED)
  @ApiResponse({
    status: 200,
    description: responseEnum.TODO_DELETED,
  })
  @ApiResponse({
    status: 404,
    description: responseEnum.TODO_NOT_FOUND,
  })
  @HttpCode(200)
  async deleteUser(
    @GetUser() { email }: User,
    @Body() { id }: DeleteTodoDTO): Promise<null> {
    return await this.todoService.deleteTodo(email, id)
  }

}
