'use client'

import { useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useLocalStorage } from 'usehooks-ts'
import {
  Button,
  Container,
  Pagination,
  SearchInput,
} from '../components/common'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/common/dialog'
import { BookForm, BookTable } from '../components/home'
import { BookList } from '../types'
import { BOOKS_PER_PAGE } from '../utils/constants'
import {
  BOOK_LIST,
  generateRandomString,
  splitListIntoPages,
} from '../utils/functions'

export default function Home() {
  const [searchValue, setSearchValue] = useState('')
  const [page, setPage] = useState(1)
  const [bookList, setBookList] = useLocalStorage<BookList>(
    'bookList',
    BOOK_LIST,
  )
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

  const handleDelete = (id: string | number) => {
    setBookList((prevBookList) => prevBookList.filter((book) => book.id !== id))

    // Show toast
    const book = bookList.find((book) => book.id === id)
    if (book) {
      toast.success(`Book ${book.title} has been deleted`)
    }
  }

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

    setBookList((prevBookList) => [...prevBookList, newBook])
    setErrorFormMsg('')

    // Show toast
    toast.success(`Book ${title.value} has been created`)
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

        <BookTable bookList={paginatedBookList} onDeleteBook={handleDelete} />

        <div className="flex justify-end pt-4">
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
