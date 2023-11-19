import { NextFunction, Request, Response } from 'express'
import { CreateUserInput, LoginUserInput } from '../schema/user.schema'
import { createUser, findUser, signToken } from '../services/user.service'
import AppError from '../utils/appError'

export const registerHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUser({
      email: req.body.email,
      password: req.body.password,
    })

    await user.save()

    return res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
    })
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).json({
        status: 'fail',
        message: 'Email already exist',
      })
    }
    next(err)
  }
}

export const loginHandler = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    let user = await findUser({ email: req.body.email })

    if (
      !user ||
      !(await user.comparePasswords(user.password, req.body.password))
    ) {
      return next(new AppError('Invalid email or password', 401))
    }

    const { access_token } = await signToken(user)

    res.set('Authorization', `Bearer ${access_token}`)

    res.status(200).json({
      status: 'success',
      access_token: `Bearer ${access_token}`,
    })
  } catch (err: any) {
    next(err)
  }
}

export const logoutHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({ status: 'Logout Successfull' })
  } catch (err: any) {
    next(err)
  }
}
