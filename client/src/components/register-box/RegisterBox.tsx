import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../button/Button'

interface RegisterBoxProps {
  handleRegister: () => void
  isLoading: boolean
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  formData: {
    email: string
    password: string
  }
}

const RegisterBox = (props: RegisterBoxProps) => {
  const { handleRegister, handleInputChange, formData, isLoading } = props

  return (
    <div className="w-full m-3 sm:flex-shrink-0 bg-slate-200 border-2 rounded-lg border-solid border-[#969696] flex py-10 px-6 justify-center">
      <div className="w-full flex flex-col gap-6">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="font-bold text-lg text-slate-600 uppercase">SIGN UP</p>
          <p className="font-bold text-base text-slate-600">
            Create an account to continue
          </p>
        </div>
        <div className="w-full flex flex-col input-fields">
          <label>
            Email
            <input
              required
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full"
            />
          </label>
          <div className="flex flex-col gap-3 items-start">
            <Button
              onClick={handleRegister}
              label="Register Now"
              type="submit"
              isLoading={isLoading}
            />
            <div className="flex self-center">
              <p className="text-slate-600 text-sm font-medium">
                Already have an account?&nbsp;
              </p>
              <Link
                className="text-slate-500 hover:underline text-sm font-medium"
                to="/login"
              >
                Login →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterBox
