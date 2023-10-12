'use client'

import { useRouter, useSearchParams } from 'next/navigation'
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

  const { onDeleteBook } = useBookSWR({
    params: getFilterBookParams(searchParams),
  })

  const [open, setOpen] = useState(false)
  const [deletedBook, setDeletedBook] = useState<Book | null>(null)

  const handleDelete = () => {
    if (!deletedBook) return

    onDeleteBook?.(deletedBook)
    if (shouldGoToHomePage) {
      router.back()
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
