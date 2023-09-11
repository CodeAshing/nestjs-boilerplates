import { Module } from '@nestjs/common'
import { TodoController } from './todo.controller'
import { TodoService } from './todo.service'
import { MongooseModule } from '@nestjs/mongoose'

import { connectionEnum } from 'src/app/common/enum'
import { Todo, TodoSchema } from './schema'
@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Todo.name, schema: TodoSchema }],
      connectionEnum.ERP,
    ),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
