import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './login/Login'
import NotFound from '../components/not-found/NotFount'
import Toast from '../components/toast/Toast'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import Register from './register/Register'
import AuthMiddleware from '../middleware/AuthMiddleware'

const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <AuthMiddleware>
        <Login />
      </AuthMiddleware>
    ),
    errorElement: <NotFound />,
  },
  {
    path: '/register',
    element: (
      <AuthMiddleware>
        <Register />
      </AuthMiddleware>
    ),
    errorElement: <NotFound />,
  },
  // {
  //   path: '/',
  //   element: (
  //     <AuthMiddleware>
  //       <Feed />
  //     </AuthMiddleware>
  //   ),
  //   errorElement: <NotFound />,
  // },
])

const App = () => {
  const { toast } = useSelector((state: RootState) => state.globalState)

  return (
    <>
      <RouterProvider router={router} />
      <Toast
        duration={toast.duration}
        message={toast.message}
        type={toast.type}
      />
    </>
  )
}

export default App
