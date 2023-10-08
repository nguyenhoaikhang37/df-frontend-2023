'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { SignInForm } from '../components/login'
import { useAuth } from '../contexts/AuthContext'
import { AuthSchema } from '../components/login/sign-in-form'

const Auth = () => {
  const router = useRouter()

  const { currentUser, onLogin } = useAuth()

  useEffect(() => {
    if (currentUser) {
      // redirect to book page
      router.push('/book')
    }
  }, [currentUser])

  const handleLogin = (loginPayload: AuthSchema) => {
    onLogin(loginPayload)
    router.push('/book')
  }

  return (
    <div className="relative h-screen w-full">
      <div className="absolute left-1/2 top-1/2 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 border border-stone-300 px-4 py-16">
        <div className="p-2 text-center text-2xl font-bold text-primary">
          <Link href="/">Bookstore</Link>
        </div>

        <div className="mt-8">
          <SignInForm onSubmit={handleLogin} />
        </div>
      </div>
    </div>
  )
}

export default Auth
