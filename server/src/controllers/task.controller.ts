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
  deleteTaskById,
  filterTasksByStatusAndSearch,
  findAllTaskByUser,
  findAndUpdateTask,
  findTaskById,
} from '../services/task.service'
import AppError from '../utils/appError'
import mongodb from 'mongodb'

export const createTaskHandler = async (
  req: Request<{}, {}, CreateTaskInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.id

    const task = await createTask({ input: req.body, user_id: userId })

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
    const userId = res.locals.user.id

    const { search, status } = req.query

    if (!userId) {
      return next(new AppError('User with that ID not found', 404))
    }

    const tasks = await findAllTaskByUser(userId)

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
    const userId = res.locals.user.id
    const taskId = req.params.taskId

    const task = await findTaskById(taskId)

    if (!task) {
      return next(new AppError('Task with that ID not found', 404))
    }

    if (task.user_id !== userId) {
      return next(
        new AppError('You are not authorized to perform this action', 401)
      )
    }

    const deletedTask: mongodb.DeleteResult = await deleteTaskById(
      taskId,
      userId
    )

    if (deletedTask.deletedCount) {
      res.status(204).json({
        status: 'success',
        message: 'Task deleted successfully',
      })
    } else {
      res.status(500).json({
        status: 'fail',
        message: 'Something went wrong',
      })
    }
  } catch (err: any) {
    next(err)
  }
}
