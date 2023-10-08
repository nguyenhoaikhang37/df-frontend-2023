'use client'

import Link from 'next/link'
import { BookList } from '../../types'
import { Button } from '../common'
import { AddEditBookDialog, DeleteBookDialog } from '../dialog'

interface BookTableProps {
  bookList: BookList
}

export default function BookTable({ bookList }: BookTableProps) {
  return (
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
                <AddEditBookDialog formValues={book} />

                <DeleteBookDialog book={book} />

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
  )
}
