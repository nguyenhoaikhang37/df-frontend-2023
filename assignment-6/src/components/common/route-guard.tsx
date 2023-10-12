import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { RouterPaths } from '../../utils/constants'
import { getAccessToken } from '../../utils/functions'

export default function RouteGuard({ children }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const isLoggedIn = Boolean(getAccessToken())

    if (!isLoggedIn && pathname !== RouterPaths.LOGIN) {
      router.replace(RouterPaths.LOGIN)
    } else if (isLoggedIn && pathname === RouterPaths.LOGIN) {
      router.replace(RouterPaths.BOOK)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return children
}
