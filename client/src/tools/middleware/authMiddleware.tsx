import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/authContext/AuthContext'
import { getCookie } from 'src/utils/utils'
import { axiosInstance } from 'src/api/constants'
import useToast from 'src/components/shared/ui/toast/use-toast'

interface IAuthMiddlewareProps {
  children: React.ReactNode
}

const publicRoutes = ['/', '/auth/login', '/auth/register']

const AuthMiddleware: React.FC<IAuthMiddlewareProps> = ({ children }) => {
  const { toast } = useToast()
  const location = useLocation()
  const navigate = useNavigate()
  const { handleSetAuth } = useAuthContext()
  const [canRenderChildren, setCanRenderChildren] = useState(false)

  const handleGetUser = useCallback(async () => {
    try {
      const fetch = await axiosInstance.get('/users/single')
      return fetch.data
    } catch (err) {
      toast({
        title: 'Uh oh! Something went wrong',
        description: 'Error logging in',
        variant: 'error',
      })
    }
  }, [toast])

  const main = useCallback(async () => {
    const tokenIsPresent = getCookie('notToken')
    if (tokenIsPresent) {
      const data = await handleGetUser()
      if (data && data.success) {
        const cred = data.data as { email: string; _id: string }
        handleSetAuth({ userId: cred._id, email: cred.email })
        if (publicRoutes.includes(location.pathname)) {
          navigate('/dashboard')
        }
      } else {
        if (!publicRoutes.includes(location.pathname)) {
          navigate('/')
        }
      }
      return
    }

    if (!publicRoutes.includes(location.pathname)) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleGetUser, navigate, location.pathname])

  useEffect(() => {
    main()
    setCanRenderChildren(true)
  }, [main])

  return canRenderChildren ? children : null
}

export default AuthMiddleware
