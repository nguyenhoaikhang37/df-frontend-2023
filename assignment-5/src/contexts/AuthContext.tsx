'use client'

import { createContext, useContext, useMemo } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { LoginPayload } from '../types'

interface AuthContextType {
  currentUser: string
  onLogin: (user: LoginPayload) => void
  onLogout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error('useAuth has to be used within <AuthContext.Provider>')
  }

  return authContext
}

export default function AuthProvider(props) {
  const [currentUser, setCurrentUser] = useLocalStorage<string | null>(
    'currentUser',
    null,
  )

  const handleLogin = (user: LoginPayload) => {
    const { email } = user

    setCurrentUser(email)
  }

  const handleLogout = () => {
    setCurrentUser(null)
  }

  const value = useMemo(
    () => ({
      currentUser,
      onLogin: handleLogin,
      onLogout: handleLogout,
    }),
    [currentUser, handleLogin, handleLogout],
  )

  return <AuthContext.Provider value={value} {...props} />
}
