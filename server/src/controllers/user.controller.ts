import { NextFunction, Request, Response } from 'express'
import { omit } from 'lodash'
import { commonKeysToExclude } from '../constants'

export const getMeHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = omit(res.locals.user, [...commonKeysToExclude, 'password'])
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    })
  } catch (err: any) {
    next(err)
  }
}
