import crypto from 'crypto'
import {
  getModelForClass,
  index,
  modelOptions,
  pre,
  prop,
  Severity,
} from '@typegoose/typegoose'
import bcrypt from 'bcryptjs'

@index({ email: 1 }, { unique: true })
@pre<User>('save', async function (next) {
  this.id = this._id
  if (!this.isModified('password')) return

  this.password = await bcrypt.hash(this.password, 12)
  next()
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class User {
  @prop()
  name: string

  @prop()
  id: string

  @prop({ unique: true, required: true })
  email: string

  @prop({ required: true, select: false })
  password: string

  async comparePasswords(hashedPassword: string, candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, hashedPassword)
  }
}

const userModel = getModelForClass(User)
export default userModel
