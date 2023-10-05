'use client'

import { createContext, useContext, useMemo } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { toast } from 'sonner'
import { Book, BookList } from '../types'
import { BOOK_LIST } from '../utils/functions'

interface BookContextType {
  bookList: BookList
  onDeleteBook: (id: string | number) => void
  onCreateBook: (book: Book) => void
}

const BookContext = createContext<BookContextType | null>(null)

export const useBook = () => {
  const currentUserContext = useContext(BookContext)

  if (!currentUserContext) {
    throw new Error('useBook has to be used within <BookContext.Provider>')
  }

  return currentUserContext
}

export default function BookProvider(props) {
  const [bookList, setBookList] = useLocalStorage<BookList>(
    'bookList',
    BOOK_LIST,
  )

  const handleDelete = (id: string | number) => {
    setBookList((prevBookList) => prevBookList.filter((book) => book.id !== id))

    // Show toast
    const book = bookList.find((book) => book.id === id)
    if (book) {
      toast.success(`Book ${book.title} has been deleted`)
    }
  }

  const handleCreate = (book: Book) => {
    setBookList((prevBookList) => [...prevBookList, book])

    // Show toast
    toast.success(`Book ${book.title} has been created`)
  }

  const value = useMemo(
    () => ({
      bookList,
      onDeleteBook: handleDelete,
      onCreateBook: handleCreate,
    }),
    [bookList, handleDelete],
  )

  return <BookContext.Provider value={value} {...props} />
}
