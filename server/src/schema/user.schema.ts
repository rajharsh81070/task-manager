import { object, string, TypeOf } from 'zod'

export const createUserSchema = object({
  body: object({
    email: string({ required_error: 'Email is required' }).email(
      'Invalid email'
    ),
    password: string({ required_error: 'Password is required' }),
  }),
})

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }),
    password: string({ required_error: 'Password is required' }),
  }),
})

export type CreateUserInput = TypeOf<typeof createUserSchema>['body']
export type LoginUserInput = TypeOf<typeof loginUserSchema>['body']
