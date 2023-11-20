import React from 'react'
import { useDispatch } from 'react-redux'
import { setToast } from '../../redux/slice/global.slice'
import { ToastType } from '../../components/toast/Toast'
import LoginBox from '../../components/login-box/LoginBox'
import { useLoginUserMutation } from '../../api/auth.api'
import { redirect } from 'react-router-dom'
import { validateEmail } from '../../utils/validation'

export interface ILoginInput {
  email: string
  password: string
}

const Login = () => {
  const dispatch = useDispatch()

  const [loginUser, { isLoading }] = useLoginUserMutation()

  const [formData, setFormData] = React.useState<ILoginInput>({
    email: '',
    password: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value.trim() }))
  }

  const valideLoginInput = () => {
    if (!formData.email) {
      dispatch(
        setToast({
          message: 'Please enter your Email',
          type: ToastType.Failure,
          duration: 3000,
        })
      )
      return false
    } else if (!validateEmail(formData.email)) {
      dispatch(
        setToast({
          message: 'Please enter a valid Email',
          type: ToastType.Failure,
          duration: 3000,
        })
      )
      return false
    }
    if (!formData.password) {
      dispatch(
        setToast({
          message: 'Please enter your password',
          type: ToastType.Failure,
          duration: 3000,
        })
      )
      return false
    }
    return true
  }

  const handleLogin = () => {
    if (valideLoginInput()) {
      loginUser(formData).then((res) => {
        const { data, error } = res as any
        if (data) {
          dispatch(
            setToast({
              message: 'Login successfully',
              type: ToastType.Success,
              duration: 3000,
            })
          )
          redirect('/')
        }
        if (error) {
          dispatch(
            setToast({
              message:
                error?.data?.error?.[0]?.message || 'Something went wrong',
              type: ToastType.Failure,
              duration: 3000,
            })
          )
        }
      })
    }
  }

  return (
    <div className="bg-slate-100 flex justify-center flex-col items-center min-h-screen w-full h-full">
      <div className="md:w-[480px] flex flex-col items-center justify-center gap-12">
        <LoginBox
          isLoading={isLoading}
          handleLogin={handleLogin}
          handleInputChange={handleInputChange}
          formData={formData}
        />
      </div>
    </div>
  )
}

export default Login
