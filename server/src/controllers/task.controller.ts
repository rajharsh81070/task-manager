import { NextFunction, Request, Response } from 'express'
import {
  CreateTaskInput,
  DeleteTaskInput,
  GetTaskInput,
  GetTasksByQueryInput,
  UpdateTaskInput,
} from '../schema/task.schema'
import {
  createTask,
  filterTasksByStatusAndSearch,
  findAllTaskByUser,
  findAndUpdateTask,
  findOneAndDelete,
  findTaskById,
} from '../services/task.service'
import AppError from '../utils/appError'

export const createTaskHandler = async (
  req: Request<{}, {}, CreateTaskInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = res.locals.user.id

    const task = await createTask({ input: req.body, user_id })

    res.status(201).json({
      status: 'success',
      data: {
        task,
      },
    })
  } catch (err: any) {
    next(err)
  }
}

export const getTaskHandler = async (
  req: Request<GetTaskInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await findTaskById(req.params.taskId)

    if (!task) {
      return next(new AppError('Task with that ID not found', 404))
    }

    res.status(200).json({
      status: 'success',
      data: {
        task,
      },
    })
  } catch (err: any) {
    next(err)
  }
}

export const getAllTaskOfUserByQuerHandler = async (
  req: Request<{}, {}, {}, GetTasksByQueryInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = res.locals.user.id

    const { search, status } = req.query

    if (!user_id) {
      return next(new AppError('User with that ID not found', 404))
    }

    const tasks = await findAllTaskByUser(user_id)

    const filteredTasks = filterTasksByStatusAndSearch(tasks, status, search)

    res.status(200).json({
      status: 'success',
      data: {
        filteredTasks,
      },
    })
  } catch (err: any) {
    next(err)
  }
}

export const updateTaskHandler = async (
  req: Request<UpdateTaskInput['params'], {}, UpdateTaskInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedTask = await findAndUpdateTask(
      { _id: req.params.taskId },
      req.body,
      {}
    )

    if (!updatedTask) {
      return next(new AppError('Task with that ID not found', 404))
    }

    res.status(200).json({
      status: 'success',
      data: {
        task: updatedTask,
      },
    })
  } catch (err: any) {
    next(err)
  }
}

export const deleteTaskHandler = async (
  req: Request<DeleteTaskInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await findOneAndDelete({ _id: req.params.taskId })

    if (!task) {
      return next(new AppError('Task with that ID not found', 404))
    }

    res.status(204).json({
      status: 'success',
      message: 'Task deleted successfully',
    })
  } catch (err: any) {
    next(err)
  }
}
