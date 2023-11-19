import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'
import taskModel, { Task } from '../models/task.model'

export const filterTasksByStatusAndSearch = (
  tasks: Task[],
  status?: string,
  search?: string
) => {
  return tasks.filter((task) => {
    const hasStatus = status ? task.status === status : true
    const hasSearch = search
      ? task.title.toLowerCase().includes(search.toLowerCase())
      : true

    return hasStatus && hasSearch
  })
}

export const createTask = async ({
  input,
  user_id,
}: {
  input: Partial<Task>
  user_id: string
}) => {
  return taskModel.create({ ...input, user: user_id })
}

export const findTaskById = async (id: string) =>
  await taskModel
    .findById(id)
    .lean()
    .exec()
    .then((task) => JSON.parse(JSON.stringify(task)))

export const findAllTaskByUser = async (user_id: string) => {
  const tasks = (
    await taskModel
      .find({
        user: user_id,
      })
      .lean()
      .exec()
  ).map((task) => JSON.parse(JSON.stringify(task)))

  return tasks
}

export const findTask = async (
  query: FilterQuery<Task>,
  options: QueryOptions = {}
) => {
  return await taskModel.findOne(query, {}, options).lean()
}

export const findAndUpdateTask = async (
  query: FilterQuery<Task>,
  update: UpdateQuery<Task>,
  options: QueryOptions
) =>
  await taskModel
    .findOneAndUpdate(query, update, options)
    .lean()
    .then((task) => JSON.parse(JSON.stringify(task)))

export const findOneAndDelete = async (
  query: FilterQuery<Task>,
  options: QueryOptions = {}
) => {
  return await taskModel.findOneAndDelete(query, options).lean().exec()
}
