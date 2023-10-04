'use client'

import { useParams } from 'next/navigation'
import { Button, Container, DeleteBookDialog } from '../../components/common'
import { BOOK_LIST } from '../../utils/functions'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default function BookDetail() {
  const params = useParams()

  const bookById = BOOK_LIST.find((book) => `${book.id}` === params.slug)

  // If the book is not found, return a not-found page

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
          <DeleteBookDialog book={bookById} />
        </div>
      </Container>
    </main>
  )
}
