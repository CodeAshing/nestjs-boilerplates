import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'

export type TodoDocument = Todo & Document

@Schema({
  strict: true,
  timestamps: { createdAt: true, updatedAt: true },
  collection: 'todos',
})
export class Todo {
  @Prop({ required: true })
  title: string
}

export const TodoSchema = SchemaFactory.createForClass(Todo)
