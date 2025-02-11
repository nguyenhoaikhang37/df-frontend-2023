'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button, Container } from '../../../components/common'
import { AddEditBookDialog, DeleteBookDialog } from '../../../components/dialog'
import { useBookSWR } from '../../../utils/hooks/apis'

export default function BookDetail() {
  const params = useParams()
  const bookId = params?.slug as string

  const { detailBook, isDetailLoading } = useBookSWR({
    bookId,
  })

  if (isDetailLoading || !detailBook) return <div>Loading...</div>

  return (
    <main>
      <Container>
        <Link href="/" style={{ display: 'block', marginTop: '16px' }}>
          <Button variant="link" size="none" iconName="chevron-left">
            Back
          </Button>
        </Link>

        <h1 className="my-6 text-lg font-bold">{detailBook.name}</h1>

        <p>
          <span className="font-bold">Author:</span> {detailBook.author}
        </p>
        <p>
          <span className="font-bold">Topic:</span> {detailBook.topic.name}
        </p>

        <div className="mt-4 flex gap-x-2">
          <DeleteBookDialog book={detailBook} shouldGoToHomePage />
          <AddEditBookDialog formValues={detailBook} bookId={bookId} />
        </div>
      </Container>
    </main>
  )
}
