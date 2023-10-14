'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useGetMe } from '../../generated/user/user'
import { RouterPaths } from '../../utils/constants'
import { isPausedIfNoJWT } from '../../utils/functions'
import { useAuth } from '../../utils/hooks'
import Button from './button'
import Container from './container'
import DarkModeToggle from './dark-mode-toggle'

export const HEADER_HEIGHT = '80px'

const Header = () => {
  const router = useRouter()

  const { logout } = useAuth()
  const { data, mutate } = useGetMe({
    swr: {
      isPaused: isPausedIfNoJWT,
    },
  })
  console.log('🚀 ~ file: header.tsx:28 ~ Header ~ data:', data)

  const handleLogout = () => {
    mutate()
    logout()
    router.push(RouterPaths.LOGIN)
  }

  return (
    <header className="border-b border-slate-200">
      <Container>
        <div
          className={`flex h-[50px] items-center justify-between md:h-[${HEADER_HEIGHT}]`}
        >
          <Link href="/" className="p-2 text-2xl font-bold">
            Bookstore
          </Link>
          <div className="flex items-center gap-x-4">
            <DarkModeToggle />
            {data?.data?.email && (
              <div className="flex items-center gap-x-2">
                <Image
                  src="/avatar.png"
                  alt={data?.data?.email}
                  width={35}
                  height={35}
                  className="rounded-full"
                />
                <span>{data?.data?.email}</span>
                <span className="text-slate-300">|</span>
                <Button variant="link" onClick={handleLogout} size="none">
                  Log out
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header
