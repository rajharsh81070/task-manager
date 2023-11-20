export interface GenericResponse {
  status: string
  message: string
}

export interface ILoginResponse {
  access_token: string
  status: string
}

export interface IUser {
  email: string
  userName: string
  createdAt: string
  updatedAt: string
  id: string
}
