'use client'

import { useState } from 'react'
import { Book, BookList } from '../../types'
import { Button } from '../common'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '../common/dialog'
import Link from 'next/link'

interface BookTableProps {
  bookList: BookList
  onDeleteBook?: (id: string | number) => void
}

export default function BookTable({ bookList, onDeleteBook }: BookTableProps) {
  const [deletedBook, setDeletedBook] = useState<Book | null>(null)

  const handleDelete = () => {
    if (!deletedBook) return

    onDeleteBook?.(deletedBook.id)
  }

  return (
    <>
      <table className="table" id="book-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Topic</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookList?.length > 0 &&
            bookList.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>
                  <Dialog>
                    <DialogTrigger>
                      <Button
                        variant="link"
                        onClick={() => setDeletedBook(book)}
                      >
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
                              <span className="font-bold">
                                {deletedBook?.title}
                              </span>{' '}
                              book?
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

                  <Button variant="link">
                    <Link href={`${book.id}`}>View</Link>
                  </Button>
                </td>
              </tr>
            ))}
          {bookList?.length === 0 && (
            <tr>
              <td colSpan={4} className="py-2 text-center">
                No books found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}
