'use client'

import { useState } from 'react'
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
import { Book } from '../../types'
import { useBook } from '../../contexts/BookContext'

interface DeleteBookDialogProps {
  book: Book
}

export default function DeleteBookDialog({ book }: DeleteBookDialogProps) {
  const [deletedBook, setDeletedBook] = useState<Book | null>(null)
  const { onDeleteBook } = useBook()

  const handleDelete = () => {
    if (!deletedBook) return

    onDeleteBook?.(deletedBook.id)
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="link" onClick={() => setDeletedBook(book)}>
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
