export const baseUrl = `http://localhost:2000/api/`

export const AccessToken = 'access_token'

export const excludedRoutes = ['/login', '/register']

export enum TaskStatus {
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
