'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Book, Metadata } from '../../generated/model'
import { createQueryString } from '../../utils/functions'
import { Button, Pagination } from '../common'
import { AddEditBookDialog, DeleteBookDialog } from '../dialog'

interface BookTableProps {
  bookList: Array<Book>
  metaData: Metadata | undefined
}

export default function BookTable({ bookList, metaData }: BookTableProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const page = +searchParams.get('page')! || 1

  const handlePageChange = (page: number) => {
    router.push(
      `${pathname}?${createQueryString({
        name: 'page',
        value: page.toString(),
        searchParams,
      })}`,
    )
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
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.topic?.name}</td>
                <td>
                  <AddEditBookDialog formValues={book} />

                  <DeleteBookDialog book={book} />

                  <Button variant="link">
                    <Link href={`/book/${book.id}`}>View</Link>
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
      {(metaData?.totalPages ?? 1) >= 2 && (
        <div className="flex justify-end pt-4">
          <Pagination
            totalPages={metaData?.totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  )
}
