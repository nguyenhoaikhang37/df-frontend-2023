'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { Container, Pagination, SearchInput } from '../components/common'
import { AddEditBookDialog } from '../components/dialog'
import { BookTable } from '../components/home'
import { BookSchema } from '../components/home/book-form'
import { useAuth } from '../contexts/AuthContext'
import { useBook } from '../contexts/BookContext'
import { BOOKS_PER_PAGE } from '../utils/constants'
import { splitListIntoPages } from '../utils/functions'

export default function BookHome() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const page = +searchParams.get('page')! || 1

  const [searchValue, setSearchValue] = useState(
    () => searchParams.get('q') || '',
  )
  const { currentUser } = useAuth()
  const { bookList, onCreateBook } = useBook()

  const [openAddDialog, setOpenAddDialog] = useState(false)

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
    if (!currentUser) {
      // redirect to login page
      router.push('/login')
    }
  }, [currentUser])

  useEffect(() => {
    if (searchValue.trim() === '') {
      // remove search param from url
      router.push(pathname)
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

  const handleSubmit = (book: BookSchema) => {
    onCreateBook(book)

    setOpenAddDialog(false)
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
            <AddEditBookDialog
              setOpen={setOpenAddDialog}
              open={openAddDialog}
              onSubmit={handleSubmit}
            />
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
