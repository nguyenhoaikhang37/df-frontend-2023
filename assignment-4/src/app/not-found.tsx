import Link from 'next/link'
import { Button } from '../components/common'
import { HEADER_HEIGHT } from '../components/common/header'

export default function NotFound() {
  return (
    <div
      className={`flex h-[calc(100vh-${HEADER_HEIGHT})] flex-col items-center justify-center`}
    >
      <div className="text-center">
        <h1 className="text-8xl font-bold">404</h1>
        <p className="mt-2">Page not found</p>
        <div className="mt-4">
          <Button variant="link" iconName="chevron-left">
            <Link href="/" style={{ padding: '12px' }}>
              Back to home page
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
