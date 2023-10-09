'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
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
import { useBook } from '../contexts/BookContext'
import { BOOKS_PER_PAGE } from '../utils/constants'
import { generateRandomString, splitListIntoPages } from '../utils/functions'

export default function BookHome() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const page = +searchParams.get('page')! || 1

  const [searchValue, setSearchValue] = useState(
    () => searchParams.get('q') || '',
  )
  const { bookList, onCreateBook } = useBook()
  const [errorFormMsg, setErrorFormMsg] = useState('')
  const [open, setOpen] = useState(false)

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

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set(name, value)

    return params.toString()
  }

  useEffect(() => {
    if (searchValue.trim() === '') {
      // remove search param from url
      const params = new URLSearchParams(searchParams)

      params.delete('search')

      router.push(`${pathname}?${params.toString()}`)
    } else {
      const params = new URLSearchParams(searchParams)
      params.set('q', searchValue)
      params.set('page', '1')

      router.push(`${pathname}?${params.toString()}`)
    }
  }, [searchValue])

  const handlePageChange = (page: number) => {
    router.push(`${pathname}?${createQueryString('page', page.toString())}`)
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
