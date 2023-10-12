'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useAuthSWR } from '../../utils/hooks/apis'
import Button from './button'
import Container from './container'
import DarkModeToggle from './dark-mode-toggle'

export const HEADER_HEIGHT = '80px'

const Header = () => {
  const { profile, logout } = useAuthSWR()

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
            {profile?.email && (
              <div className="flex items-center gap-x-2">
                <Image
                  src="/avatar.png"
                  alt={profile?.email}
                  width={35}
                  height={35}
                  className="rounded-full"
                />
                <span>{profile?.email}</span>
                <span className="text-slate-300">|</span>
                <Button variant="link" onClick={logout} size="none">
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
