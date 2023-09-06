import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { responseEnum } from './enum';
import { ResponseMessage } from 'src/app/common/decorator';

@Controller('todo')
  @ApiTags('Todo')
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
  async getTodo(): Promise<any> {
    return await this.todoService.getTodo();
  }
}
