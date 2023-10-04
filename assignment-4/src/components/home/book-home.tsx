'use client'

import React, { useMemo, useRef, useState } from 'react'
import { useBook } from '../../contexts/BookContext'
import { BOOKS_PER_PAGE } from '../../utils/constants'
import { generateRandomString, splitListIntoPages } from '../../utils/functions'
import { Button, Container, Pagination, SearchInput } from '../common'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../common/dialog'
import BookForm from './book-form'
import BookTable from './book-table'

const BookHome = () => {
  const [searchValue, setSearchValue] = useState('')
  const [page, setPage] = useState(1)
  const { bookList, onCreateBook } = useBook()
  const [errorFormMsg, setErrorFormMsg] = useState('')
  const [open, setOpen] = useState(false)

  const firstInputRef = useRef<HTMLInputElement>(null)

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

  const handlePageChange = (page: number) => {
    setPage(page)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const title = form.elements.namedItem('title') as HTMLInputElement
    const author = form.elements.namedItem('author') as HTMLInputElement
    const genre = form.elements.namedItem('genre') as HTMLSelectElement

    if (!title.value.trim() || !author.value.trim() || !genre.value.trim()) {
      setErrorFormMsg('Please fill in all fields')
      return
    }

    const newBook = {
      id: generateRandomString(),
      title: title.value,
      author: author.value,
      genre: genre.value,
    }

    onCreateBook(newBook)
    setErrorFormMsg('')

    // Clear the form
    form.reset()

    setOpen(false)
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
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>
                <Button iconName="plus" iconPosition="right">
                  Add book
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Book</DialogTitle>
                  <DialogDescription>
                    <div className="mt-6">
                      <BookForm
                        onSubmit={handleSubmit}
                        errorMsg={errorFormMsg}
                        firstInputRef={firstInputRef}
                      />
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <BookTable bookList={paginatedBookList} />

        {filteredBookList.flat().length > BOOKS_PER_PAGE && (
          <div className="flex justify-end pt-4">
            <Pagination
              totalItems={filteredBookList.flat().length}
              itemsPerPage={BOOKS_PER_PAGE}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </Container>
    </main>
  )
}

export default BookHome
