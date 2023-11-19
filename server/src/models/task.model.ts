import {
  getModelForClass,
  modelOptions,
  pre,
  prop,
  Ref,
  Severity,
} from '@typegoose/typegoose'
import { User } from './user.model'
import { TaskStatus } from '../constants'

@pre<Task>('save', async function (next) {
  this.id = this._id
  next()
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Task {
  @prop()
  id: string

  @prop({ required: true })
  title: string

  @prop()
  description: string

  @prop({ default: TaskStatus.TO_DO.toString() })
  status: string

  @prop({ required: true })
  dueDate: Date

  @prop({ required: true, ref: () => User })
  user: Ref<User>
}

const taskModel = getModelForClass(Task)

export default taskModel
