import React from 'react'
import { useDispatch } from 'react-redux'
import { setToast } from '../../redux/slice/global.slice'
import { ToastType } from '../../components/toast/Toast'
import RegisterBox from '../../components/register-box/RegisterBox'
import { useRegisterUserMutation } from '../../api/auth.api'
import { useNavigate } from 'react-router-dom'

export interface IRegisterInput {
  email: string
  password: string
}

const Register = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [registerUser, { isLoading }] = useRegisterUserMutation()

  const [formData, setFormData] = React.useState<IRegisterInput>({
    email: '',
    password: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value.trim() }))
  }

  const valideRegisterInput = () => {
    if (!formData.email) {
      dispatch(
        setToast({
          message: 'Please enter your email',
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

  const handleRegister = () => {
    if (valideRegisterInput()) {
      registerUser(formData).then((res) => {
        const { data, error } = res as any
        if (data) {
          dispatch(
            setToast({
              message: 'Register successfull',
              type: ToastType.Success,
              duration: 3000,
            })
          )
          navigate('/login')
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
    <div className="bg-[#131319] flex justify-center flex-col items-center min-h-screen w-full h-full">
      <div className="flex flex-col items-center justify-center gap-12">
        <RegisterBox
          isLoading={isLoading}
          handleRegister={handleRegister}
          handleInputChange={handleInputChange}
          formData={formData}
        />
      </div>
    </div>
  )
}

export default Register
