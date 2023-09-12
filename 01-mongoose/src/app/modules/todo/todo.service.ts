import { TodoDocument, Todo } from './schema'
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import mongoose, { Model } from 'mongoose'
import { connectionEnum } from 'src/app/common/enum'
import { Types } from 'mongoose'

import { responseEnum } from './enum'
import { AddTodoDTO } from './dto'

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name, connectionEnum.database)
    private readonly todoModel: Model<TodoDocument>,
  ) {}

  async getTodo(email: string): Promise<Todo[]> {
    const todos = await this.todoModel.find({ email })

    if (!todos) throw new NotFoundException(responseEnum.TODO_NOT_FOUND)

    return todos
  }

  async setTodo(
    { title, description }: AddTodoDTO,
    email: string,
  ): Promise<null> {
    await this.todoModel.create({ title, description, email })
    return null
  }

  async deleteTodo(email: string, id: Types.ObjectId): Promise<null> {
    const exists = await this.todoModel.exists({ email, _id: id })

    if (!exists) throw new NotFoundException(responseEnum.TODO_NOT_FOUND)

    await this.todoModel.deleteOne({ email, _id: id })

    return null
  }
}
