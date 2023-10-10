'use client'

import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'
import { Button, Container } from '../../../components/common'
import { AddEditBookDialog, DeleteBookDialog } from '../../../components/dialog'

export default function BookDetail() {
  const params = useParams()

  const bookById = undefined

  if (!bookById) return notFound()

  return (
    <main>
      <Container>
        <Link href="/" style={{ display: 'block', marginTop: '16px' }}>
          <Button variant="link" size="none" iconName="chevron-left">
            Back
          </Button>
        </Link>

        <h1 className="my-6 text-lg font-bold">{bookById}</h1>

        <p>
          <span className="font-bold">Author:</span> {bookById}
        </p>
        <p>
          <span className="font-bold">Topic:</span> {bookById}
        </p>

        <div className="mt-4 flex gap-x-2">
          <DeleteBookDialog book={bookById} shouldGoToHomePage />
          <AddEditBookDialog formValues={bookById} />
        </div>
      </Container>
    </main>
  )
}
