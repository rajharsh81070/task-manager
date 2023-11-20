import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../api/types'
import { AccessToken } from '../../constants'
import { getLocalStorageItem } from '../../utils/localStorage'

interface IUserState {
  user: IUser | null
  accessToken: string | null
}

const initialState: IUserState = {
  user: null,
  accessToken: getLocalStorageItem(AccessToken),
}

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        accessToken: action.payload,
      }
    },
    logout: () => {
      localStorage.removeItem(AccessToken)
      return {
        ...initialState,
        accessToken: null,
      }
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      return {
        ...state,
        user: action.payload,
      }
    },
  },
})

export default userSlice.reducer

export const { logout, setUser, setAccessToken } = userSlice.actions
