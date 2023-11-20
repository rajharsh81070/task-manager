import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GenericResponse, ILoginResponse } from './types'
import { IRegisterInput } from '../routes/register/Register'
import { ILoginInput } from '../routes/login/Login'
import { setAccessToken } from '../redux/slice/user.slice'
import { setLocalStorageItem } from '../utils/localStorage'
import { AccessToken, baseUrl } from '../constants'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<GenericResponse, IRegisterInput>({
      query(data) {
        return {
          url: 'auth/register',
          method: 'POST',
          body: data,
        }
      },
    }),
    loginUser: builder.mutation<ILoginResponse, ILoginInput>({
      query(data) {
        return {
          url: 'auth/login',
          method: 'POST',
          body: data,
        }
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          setLocalStorageItem(AccessToken, data.access_token)
          await dispatch(setAccessToken(data.access_token))
        } catch (error) {
          console.log(error)
        }
      },
    }),
    logoutUser: builder.mutation<void, void>({
      query() {
        return {
          url: 'auth/logout',
          method: 'GET',
        }
      },
    }),
  }),
})

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
} = authApi
