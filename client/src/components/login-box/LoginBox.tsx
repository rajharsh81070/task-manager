import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../button/Button'

interface LoginBoxProps {
  handleLogin: () => void
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  isLoading: boolean
  formData: {
    email: string
    password: string
  }
}

const LoginBox = (props: LoginBoxProps) => {
  const { handleLogin, handleInputChange, formData, isLoading } = props

  return (
    <div className="w-full m-3 sm:flex-shrink-0 bg-slate-200 border-2 rounded-lg border-solid border-[#969696] flex py-10 px-6 justify-center">
      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="font-bold text-lg text-slate-600 uppercase">
            WELCOME BACK
          </p>
          <p className="font-bold text-base text-slate-600">
            Log into your account
          </p>
        </div>
        <div className="flex w-full flex-col input-fields">
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
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
              label="Login Now"
              onClick={handleLogin}
              type="submit"
              isLoading={isLoading}
            />
            <div className="flex self-center">
              <p className="text-slate-600 text-sm font-medium">
                Not registered yet?&nbsp;
              </p>
              <Link
                className="text-slate-500 hover:underline text-sm font-medium"
                to="/register"
              >
                Register →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginBox
