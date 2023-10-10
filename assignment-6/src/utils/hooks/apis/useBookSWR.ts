'use client'

import { toast } from 'sonner'
import useSWR, { SWRConfiguration } from 'swr'
import { bookApi } from '../../../services'
import { BookPayload, Pagination, ListParams } from '../../../types'
import { QueryKeys } from '../../constants'
import { getErrorMessage } from '../../functions'

export interface UseBookSWRProps {
  options?: SWRConfiguration
  params?: Partial<ListParams>
}

const defaultParams = {
  page: 1,
  pageSize: 5,
}

export function useBookSWR({
  options,
  params = defaultParams,
}: UseBookSWRProps = {}) {
  const { data, error, isLoading, mutate } = useSWR(
    [QueryKeys.GET_BOOK_LIST, params],
    () => bookApi.getAll(params),
    {
      dedupingInterval: 60 * 1000, // 60s
      keepPreviousData: true,
      ...options,
    },
  )

  async function addNewBook(payload: BookPayload) {
    try {
      const newBook = await bookApi.add(payload)
      console.log(
        '🚀 ~ file: useBookSWR.ts:30 ~ addNewBook ~ newBook:',
        newBook,
      )

      mutate()

      toast.success(`Book ${newBook.data.name} has been created`)
    } catch (error) {
      const message = getErrorMessage(error)
      toast.error(message)
    }
  }

  async function updateBook(id: string | number, payload: BookPayload) {
    try {
      const updatedBook = await bookApi.update(id, payload)

      mutate()

      toast.success(`Book ${updatedBook.data.name} has been updated`)
    } catch (error) {
      const message = getErrorMessage(error)
      toast.error(message)
    }
  }

  return {
    bookList: data?.data ?? [],
    metaData: (data?.metadata as Pagination) ?? {},
    onAddBook: addNewBook,
    onUpdateBook: updateBook,
    isLoading,
    isError: error,
  }
}
