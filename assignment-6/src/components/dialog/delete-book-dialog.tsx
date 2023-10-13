'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Book } from '../../types'
import { getFilterBookParams } from '../../utils/functions'
import { useBookSWR } from '../../utils/hooks/apis'
import Button from '../common/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog'
import { RouterPaths } from '../../utils/constants'

interface DeleteBookDialogProps {
  book: Book
  shouldGoToHomePage?: boolean
}

export default function DeleteBookDialog({
  book,
  shouldGoToHomePage,
}: DeleteBookDialogProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const { bookList, onDeleteBook } = useBookSWR({
    params: getFilterBookParams(searchParams),
  })

  const [open, setOpen] = useState(false)
  const [deletedBook, setDeletedBook] = useState<Book | null>(null)

  const handleDelete = async () => {
    if (!deletedBook) return

    const isLastBookInPage =
      bookList?.length === 1 && searchParams.get('page') !== '1'

    if (isLastBookInPage) {
      const params = new URLSearchParams(searchParams)
      params.set(
        'page',
        (Number(searchParams.get('page') ?? '1') - 1).toString(),
      )

      router.push(`${pathname}?${params.toString()}`)
    }

    await onDeleteBook?.(deletedBook)

    if (shouldGoToHomePage) {
      const params = new URLSearchParams(searchParams)
      params.set('page', '1')

      router.push(`${RouterPaths.BOOK}?${params.toString()}`)
    }
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="link" size="none" onClick={() => setDeletedBook(book)}>
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Book</DialogTitle>
          <DialogDescription>
            <div className="mt-6 text-center">
              <p>
                Do you want to delete{' '}
                <span className="font-bold">{deletedBook?.name}</span> book?
              </p>
              <div className="mt-6 flex justify-end gap-x-3">
                <Button variant="link" onClick={handleDelete}>
                  Delete
                </Button>
                <DialogClose asChild>
                  <Button aria-label="Close">Cancel</Button>
                </DialogClose>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
