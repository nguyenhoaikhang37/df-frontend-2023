import { clsx, type ClassValue } from 'clsx'
import { ReadonlyURLSearchParams } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { ThemeMode } from '../../components/common/dark-mode-toggle'
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

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// @see: https://www.joshwcomeau.com/react/dark-mode/
export function getInitialColorMode(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const persistedColorPreference = window.localStorage.getItem(
    'color-mode',
  ) as ThemeMode
  const hasPersistedPreference = typeof persistedColorPreference === 'string'
  // If the user has explicitly chosen light or dark,
  // let's use it. Otherwise, this value will be null.
  if (hasPersistedPreference) {
    return persistedColorPreference
  }
  // If they haven't been explicit, let's check the media
  // query
  const mql = window.matchMedia('(prefers-color-scheme: dark)')
  const hasMediaQueryPreference = typeof mql.matches === 'boolean'
  if (hasMediaQueryPreference) {
    return mql.matches ? 'dark' : 'light'
  }
  // If they are using a browser/OS that doesn't support
  // color themes, let's default to 'light'.
  return 'light'
}

// Get a new searchParams string by merging the current
// searchParams with a provided key/value pair
export const createQueryString = (
  name: string,
  value: string,
  searchParams: ReadonlyURLSearchParams,
) => {
  const params = new URLSearchParams(searchParams)
  params.set(name, value)

  return params.toString()
}
