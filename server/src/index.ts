require('dotenv').config()
import express, { Express, NextFunction, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectDB } from './utils/connectDB'
import authRoutes from './routes/auth.route'

const app: Express = express()
const port = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'],
  })
)

app.use('/api/auth', authRoutes)

app.get(
  '/api/healthcheck',
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      status: 'success',
      message: 'Server is running',
    })
  }
)

// Unknown Routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any
  err.statusCode = 404
  next(err)
})

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || 'error'
  err.statusCode = err.statusCode || 500

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  })
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
  connectDB()
})
