import mongoose from 'mongoose'

const dbUrl = process.env.DB_CONNECT_URL || ''

export const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl)
    console.log('Database connected...')
  } catch (error: any) {
    console.log(error.message)
    setTimeout(connectDB, 5000)
  }
}
