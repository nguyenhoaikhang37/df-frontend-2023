'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../contexts/AuthContext'
import Button from './button'
import Container from './container'
import DarkModeToggle from './dark-mode-toggle'

export const HEADER_HEIGHT = '80px'

const Header = () => {
  const router = useRouter()
  const { currentUser, onLogout } = useAuth()

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
            {currentUser && (
              <div className="flex items-center gap-x-2">
                <Image
                  src="/avatar.png"
                  alt={currentUser}
                  width={35}
                  height={35}
                  className="rounded-full"
                />
                <span>{currentUser}</span>,
                <Button
                  variant="link"
                  onClick={() => {
                    onLogout()
                    router.push('/')
                  }}
                  size="none"
                >
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
