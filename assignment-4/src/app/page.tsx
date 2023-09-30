'use client'

import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { useLocalStorage } from 'usehooks-ts'
import {
  Button,
  Container,
  Pagination,
  SearchInput,
} from '../components/common'
import { BookTable } from '../components/home'
import { Book, BookList } from '../types'
import { BOOKS_PER_PAGE } from '../utils/constants'
import { BOOK_LIST, splitListIntoPages } from '../utils/functions'

export default function Home() {
  const [searchValue, setSearchValue] = useState('')
  const [page, setPage] = useState(1)
  const [bookList, setBookList] = useLocalStorage<BookList>(
    'bookList',
    BOOK_LIST,
  )
  const [editedBook, setEditedBook] = useState<Book | null>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [errorFormMsg, setErrorFormMsg] = useState('')
  const [shouldFocusInput, setShouldFocusInput] = useState(false)

  const filteredBookList = useMemo(() => {
    const filteredList = bookList.filter((book) => {
      const bookTitle = book.title.toLowerCase()
      const searchValueLower = searchValue.toLowerCase()

      return bookTitle.includes(searchValueLower)
    })

    return filteredList
  }, [bookList, searchValue])

  const paginatedBookList = useMemo(() => {
    if (filteredBookList?.length === 0) return []

    return splitListIntoPages(filteredBookList)[page - 1] // page - 1 because page starts from 0
  }, [filteredBookList, page])

  const handleDelete = (id: string | number) => {
    setBookList((prevBookList) => prevBookList.filter((book) => book.id !== id))

    // Show toast
    const book = bookList.find((book) => book.id === id)
    if (book) {
      toast.success(`Book ${book.title} has been deleted`)
    }
  }

  const handlePopupEditDialog = (id: string | number) => {
    const book = bookList.find((book) => book.id === id)
    if (book) {
      setEditedBook(book)
      setOpenDialog(true)
    }
  }

  const handlePageChange = (page: number) => {
    setPage(page)
  }

  return (
    <main>
      <Container>
        <div className="flex items-center justify-between py-3">
          <div>
            <SearchInput
              placeholder="Search books"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div>
            <Button iconName="plus" iconPosition="right">
              Add book
            </Button>
          </div>
        </div>

        <BookTable
          bookList={paginatedBookList}
          onDeleteBook={handleDelete}
          onPopupEditDialog={handlePopupEditDialog}
        />

        <div className="flex items-end pt-4">
          <Pagination
            totalItems={filteredBookList.flat().length}
            itemsPerPage={BOOKS_PER_PAGE}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        </div>
      </Container>
    </main>
  )
}
