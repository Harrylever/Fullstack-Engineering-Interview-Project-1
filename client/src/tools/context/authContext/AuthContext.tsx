/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react'

interface AuthContextType {
  cred?: {
    userId: string
    email: string
  }
  handleSetAuth: (
    credentials: { userId: string; email: string } | undefined
  ) => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}): React.ReactNode => {
  const [auth, setAuth] = useState<
    { userId: string; email: string } | undefined
  >(undefined)

  const handleSetAuth = (
    credentials: { userId: string; email: string } | undefined
  ) => {
    setAuth(credentials)
  }

  return (
    <AuthContext.Provider value={{ cred: auth, handleSetAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('Auth must be used within Auth Provider')
  }
  return context
}

export default AuthProvider
