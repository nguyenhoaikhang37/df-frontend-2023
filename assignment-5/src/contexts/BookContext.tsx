'use client'

import { createContext, useContext, useMemo } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { toast } from 'sonner'
import { Book, BookList } from '../types'
import { BOOK_LIST, generateRandomString } from '../utils/functions'

interface BookContextType {
  bookList: BookList
  onEditBook: (book: Book) => void
  onDeleteBook: (id: string | number) => void
  onCreateBook: (book: Omit<Book, 'id'>) => void
}

const BookContext = createContext<BookContextType | null>(null)

export const useBook = () => {
  const bookContext = useContext(BookContext)

  if (!bookContext) {
    throw new Error('useBook has to be used within <BookContext.Provider>')
  }

  return bookContext
}

export default function BookProvider(props) {
  const [bookList, setBookList] = useLocalStorage<BookList>(
    'bookList',
    BOOK_LIST,
  )

  const handleEdit = (book: Book) => {
    setBookList((prevBookList) => {
      const bookIndex = prevBookList.findIndex((b) => b.id === book.id)

      if (bookIndex === -1) return prevBookList

      const updatedBookList = [...prevBookList]
      updatedBookList[bookIndex] = book

      return updatedBookList
    })

    // Show toast
    toast.success(`Book ${book.title} has been updated`)
  }

  const handleDelete = (id: string | number) => {
    setBookList((prevBookList) => prevBookList.filter((book) => book.id !== id))

    const book = bookList.find((book) => book.id === id)
    if (book) {
      // Show toast
      toast.success(`Book ${book.title} has been deleted`)
    }
  }

  const handleCreate = (book: Omit<Book, 'id'>) => {
    const newBook = {
      id: generateRandomString(),
      ...book,
    }

    setBookList((prevBookList) => [...prevBookList, newBook])

    // Show toast
    toast.success(`Book ${book.title} has been created`)
  }

  const value = useMemo(
    () => ({
      bookList,
      onEditBook: handleEdit,
      onDeleteBook: handleDelete,
      onCreateBook: handleCreate,
    }),
    [bookList, handleDelete, handleCreate, handleEdit],
  )

  return <BookContext.Provider value={value} {...props} />
}
