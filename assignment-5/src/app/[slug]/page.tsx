'use client'

import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'
import { Button, Container } from '../../components/common'
import { DeleteBookDialog } from '../../components/dialog'
import { BOOK_LIST } from '../../utils/functions'

export default function BookDetail() {
  const params = useParams()

  const bookById = BOOK_LIST.find((book) => `${book.id}` === params.slug)

  if (!bookById) return notFound()

  return (
    <main>
      <Container>
        <Link href="/" style={{ display: 'block', marginTop: '16px' }}>
          <Button variant="link" size="none" iconName="chevron-left">
            Back
          </Button>
        </Link>

        <h1 className="my-6 text-lg font-bold">{bookById?.title}</h1>

        <p>
          <span className="font-bold">Author:</span> {bookById?.author}
        </p>
        <p>
          <span className="font-bold">Topic:</span> {bookById?.genre}
        </p>

        <div className="mt-4">
          <DeleteBookDialog book={bookById} shouldGoToHomePage />
        </div>
      </Container>
    </main>
  )
}
