import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ToastType } from '../../components/toast/Toast'

interface ToastState {
  message: string
  duration?: number
  type?: ToastType
}

interface GlobalState {
  toast: ToastState
}

const initialState: GlobalState = {
  toast: {
    message: '',
    duration: 0,
  },
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setToast: (state, action: PayloadAction<ToastState>) => {
      return {
        ...state,
        toast: {
          ...action.payload,
        },
      }
    },
  },
})

export const { setToast } = globalSlice.actions

export default globalSlice.reducer
