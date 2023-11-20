import React, { useCallback } from 'react'
import { useEffect } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { setToast } from '../../redux/slice/global.slice'

export enum ToastType {
  Success,
  Failure,
  Info,
}

interface IToast {
  message: string
  duration?: number
  type?: ToastType
}

const Toast = (props: IToast) => {
  const { message, duration, type } = props

  const dispatch = useDispatch()

  const onClose = useCallback(() => {
    dispatch(setToast({ message: '' }))
  }, [dispatch])

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        onClose()
      }, duration)
    }
  }, [duration, message, onClose])

  const getToastBgColor = (toastType?: ToastType) => {
    switch (toastType) {
      case ToastType.Success:
        return 'bg-green-400'
      case ToastType.Info:
        return 'bg-orange-500'
      case ToastType.Failure:
      default:
        return 'bg-red-500'
    }
  }

  if (!message) return <></>

  return (
    <div className="fixed flex items-center max-w-xs w-full divide-gray-200 rounded-lg shadow divide-x bottom-5 right-5 justify-center">
      <div
        data-test-id="toastMsg"
        id="toast-default"
        className={`${getToastBgColor(
          type
        )} flex max-w-xs animate-slide divide-gray-200 rounded-lg divide-x items-center justify-between gap-1 p-4 text-white shadow-md`}
        role="alert"
      >
        <p className="text-center text-xs font-normal">{message}</p>
        <div className="cursor-pointer pl-1" onClick={onClose}>
          <AiOutlineCloseCircle size={20} />
        </div>
      </div>
    </div>
  )
}

export default Toast
