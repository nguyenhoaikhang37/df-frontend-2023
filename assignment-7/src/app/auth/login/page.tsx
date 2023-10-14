'use client'

import Link from 'next/link'
import { useSWRConfig } from 'swr'
import { SignInForm } from '../../../components/login'
import { LoginRequest } from '../../../generated/model'
import { getGetMeKey } from '../../../generated/user/user'
import { useAuth } from '../../../utils/hooks'

const Auth = () => {
  const { login } = useAuth()

  const { mutate } = useSWRConfig()

  const handleLogin = async (loginPayload: LoginRequest) => {
    mutate(getGetMeKey())
    await login(loginPayload)
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
