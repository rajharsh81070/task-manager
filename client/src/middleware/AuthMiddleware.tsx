import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { useLocation, useNavigate } from 'react-router-dom'
import { excludedRoutes } from '../constants'

interface AuthMiddlewareProps {
  children: React.ReactNode
}

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
  const { accessToken } = useSelector((state: RootState) => state.userState)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!accessToken && !excludedRoutes.includes(location.pathname)) {
      navigate('/login')
    } else if (accessToken && excludedRoutes.includes(location.pathname)) {
      navigate('/')
    }
  }, [accessToken, location.pathname, navigate])

  return <>{children}</>
}

export default AuthMiddleware
