import jwt, { SignOptions } from 'jsonwebtoken'

export const signJwt = (payload: Object, options: SignOptions = {}) => {
  const privateKey = process.env[`JWT_SECRET`] || ''
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'HS256',
  })
}

export const verifyJwt = <T>(token: string): T | null => {
  try {
    const publicKey = process.env[`JWT_SECRET`] || ''

    return jwt.verify(token, publicKey) as T
  } catch (error) {
    return null
  }
}
