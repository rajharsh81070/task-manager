import { omit } from 'lodash'
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'
import userModel, { User } from '../models/user.model'
import { signJwt } from '../utils/jwt'
import { DocumentType } from '@typegoose/typegoose'

export const createUser = async (input: Partial<User>) => {
  return userModel.create(input)
}

export const findUserById = async (id: string) => {
  const user = await userModel.findById(id).lean()
  return omit(user, 'password')
}

export const findUser = async (
  query: FilterQuery<User>,
  options: QueryOptions = {}
) => {
  return await userModel.findOne(query, {}, options).select('+password')
}

export const findAndUpdateUser = async (
  query: FilterQuery<User>,
  update: UpdateQuery<User>,
  options: QueryOptions
) => {
  return await userModel.findOneAndUpdate(query, update, options)
}

export const signToken = async (user: DocumentType<User>) => {
  const access_token = signJwt(
    { id: user.id },
    {
      expiresIn: `9 days`,
    }
  )

  return { access_token }
}
