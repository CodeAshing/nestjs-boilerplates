import { TodoDocument, Todo } from './schema'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import mongoose, { Model } from 'mongoose'
import { connectionEnum } from 'src/app/common/enum'

import { responseEnum } from './enum'

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name, connectionEnum.ERP)
    private readonly todoModel: Model<TodoDocument>,
  ) {}

  async getTodo(): Promise<any> {
    const todos = await this.todoModel.find()

    if (!todos) throw new NotFoundException(responseEnum.TODO_NOT_FOUND)

    return todos
  }

  async setTodo(title: string): Promise<any> {
    const todo = await this.todoModel.create({ title }).catch((e) => {
      throw new NotFoundException(e.message)
    })

    if (todo) return todo

    throw new NotFoundException(responseEnum.TODO_NOT_FOUND)
  }
}
