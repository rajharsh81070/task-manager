import { values } from 'lodash'
import { object, string, TypeOf } from 'zod'
import { TaskStatus } from '../constants'

export const createTaskSchema = object({
  body: object({
    title: string({
      required_error: 'Title is required',
    }),
    dueData: string().datetime({
      message: 'Invalid due date format',
    }),
    status: string()
      .refine((val) => Object.keys(TaskStatus).includes(val), {
        message: 'Invalid status',
      })
      .optional(),
    dueDate: string()
      .datetime({
        message: 'Invalid due date format',
      })
      .transform((val) => new Date(val))
      .optional(),
  }),
})

const taskParams = {
  params: object({
    taskId: string(),
  }),
}

export const getTasksByQuerySchema = object({
  query: object({
    search: string(),
    status: string(),
  }).partial(),
})

export const getTaskSchema = object({
  ...taskParams,
})

export const updateTaskSchema = object({
  ...taskParams,
  body: object({
    title: string(),
    description: string(),
    status: string().refine((val) => Object.keys(TaskStatus).includes(val), {
      message: 'Invalid status',
    }),
    dueDate: string()
      .datetime({
        message: 'Invalid due date format',
      })
      .transform((val) => new Date(val)),
  }).partial(),
})

export const deleteTaskSchema = object({
  ...taskParams,
})

export type CreateTaskInput = TypeOf<typeof createTaskSchema>['body']
export type GetTaskInput = TypeOf<typeof getTaskSchema>['params']
export type UpdateTaskInput = TypeOf<typeof updateTaskSchema>
export type DeleteTaskInput = TypeOf<typeof deleteTaskSchema>['params']
export type GetTasksByQueryInput = TypeOf<typeof getTasksByQuerySchema>['query']
