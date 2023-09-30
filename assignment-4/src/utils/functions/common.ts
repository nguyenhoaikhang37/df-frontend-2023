import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { BOOKS_PER_PAGE } from '../constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRandomString() {
  return Math.random().toString(36).substring(2, 15)
}

export function splitListIntoPages<T>(
  list: Array<T>,
  itemsPerPage: number = BOOKS_PER_PAGE,
) {
  const pages = Math.ceil(list.length / itemsPerPage)

  const newListWithPagination = Array.from({ length: pages }, (_, index) => {
    const start = index * itemsPerPage
    return list.slice(start, start + itemsPerPage)
  })

  return newListWithPagination
}
