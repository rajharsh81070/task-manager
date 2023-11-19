import express from 'express'
import { deserializeUser } from '../middleware/deserializeUser'
import { requireUser } from '../middleware/requireUser'
import { validate } from '../middleware/validate'
import {
  createTaskSchema,
  deleteTaskSchema,
  getTaskSchema,
  getTasksByQuerySchema,
  updateTaskSchema,
} from '../schema/task.schema'
import {
  createTaskHandler,
  deleteTaskHandler,
  getAllTaskOfUserByQuerHandler,
  getTaskHandler,
  updateTaskHandler,
} from '../controllers/task.controller'

const router = express.Router()

router.use(deserializeUser, requireUser)
router.route('/create').post(validate(createTaskSchema), createTaskHandler)

router
  .route('')
  .get(validate(getTasksByQuerySchema), getAllTaskOfUserByQuerHandler)

router
  .route('/:taskId')
  .get(validate(getTaskSchema), getTaskHandler)
  .patch(validate(updateTaskSchema), updateTaskHandler)
  .delete(validate(deleteTaskSchema), deleteTaskHandler)

export default router
