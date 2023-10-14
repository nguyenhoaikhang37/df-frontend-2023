'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button, Container } from '../../../components/common'
import { AddEditBookDialog, DeleteBookDialog } from '../../../components/dialog'
import { useGetBook } from '../../../generated/book/book'
import { isPausedIfNoJWT } from '../../../utils/functions'

export default function BookDetail() {
  const params = useParams()
  const bookId = Number(params?.slug || 1) as number

  const { data, isLoading } = useGetBook(bookId, {
    swr: {
      isPaused: isPausedIfNoJWT,
    },
  })

  if (isLoading || !data?.data) return <div>Loading...</div>

  return (
    <main>
      <Container>
        <Link href="/" style={{ display: 'block', marginTop: '16px' }}>
          <Button variant="link" size="none" iconName="chevron-left">
            Back
          </Button>
        </Link>

        <h1 className="my-6 text-lg font-bold">{data.data.name}</h1>

        <p>
          <span className="font-bold">Author:</span> {data.data.author}
        </p>
        <p>
          <span className="font-bold">Topic:</span> {data.data.topic?.name}
        </p>

        <div className="mt-4 flex gap-x-2">
          <DeleteBookDialog book={data.data} shouldGoToHomePage />
          <AddEditBookDialog formValues={data.data} />
        </div>
      </Container>
    </main>
  )
}
