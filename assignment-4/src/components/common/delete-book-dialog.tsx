'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useBook } from '../../contexts/BookContext'
import { Book } from '../../types'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../common/dialog'
import Button from './button'

interface DeleteBookDialogProps {
  book: Book
  shouldGoToHomePage?: boolean
}

export default function DeleteBookDialog({
  book,
  shouldGoToHomePage,
}: DeleteBookDialogProps) {
  const router = useRouter()
  const { onDeleteBook } = useBook()

  const [deletedBook, setDeletedBook] = useState<Book | null>(null)

  const handleDelete = () => {
    if (!deletedBook) return

    onDeleteBook?.(deletedBook.id)
    if (shouldGoToHomePage) {
      router.back()
    }
  }

  return (
    <Dialog>
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
                <span className="font-bold">{deletedBook?.title}</span> book?
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
