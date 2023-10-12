'use client'

import { useMemo } from 'react'
import { toast } from 'sonner'
import useSWR, { SWRConfiguration } from 'swr'
import { bookApi } from '../../../services'
import { Book, BookPayload, ListParams, Pagination } from '../../../types'
import { QueryKeys } from '../../constants'
import { getErrorMessage, isSSR } from '../../functions'

export interface UseBookSWRProps {
  options?: SWRConfiguration
  params?: Partial<ListParams>
  bookId?: number | string
}

const defaultParams = {
  page: 1,
  pageSize: 5,
}

export function useBookSWR({
  options,
  params = defaultParams,
  bookId,
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

  const { data: detailData, isLoading: isDetailLoading } = useSWR(
    [QueryKeys.GET_BOOK_LIST, bookId],
    () => bookApi.get(+bookId!),
    {
      dedupingInterval: 60 * 1000, // 60s
      isPaused: () => (isSSR() ? true : Boolean(!bookId)),
      ...options,
    },
  )
  console.log('🚀 ~ file: useBookSWR.ts:27 ~ bookId:', { bookId, detailData })

  async function addNewBook(payload: BookPayload) {
    try {
      const newBook = await bookApi.add(payload)

      mutate()

      toast.success(`Book ${newBook.data.name} has been created`)
    } catch (error) {
      const message = getErrorMessage(error)
      toast.error(message)
    }
  }

  async function updateBook(id: string | number, payload: BookPayload) {
    try {
      const updatedBook = await bookApi.update(id, {
        ...payload,
        topicId: +payload.topicId,
      })

      mutate()

      toast.success(`Book ${updatedBook.data.name} has been updated`)
    } catch (error) {
      const message = getErrorMessage(error)
      toast.error(message)
    }
  }

  async function deleteBook(deletedBook: Book) {
    try {
      await bookApi.delete(deletedBook.id)

      mutate()

      toast.success(`Book ${deletedBook.name} has been updated`)
    } catch (error) {
      const message = getErrorMessage(error)
      toast.error(message)
    }
  }

  return useMemo(
    () => ({
      bookList: data?.data ?? [],
      metaData: (data?.metadata as Pagination) ?? {},
      detailBook: detailData?.data,
      onAddBook: addNewBook,
      onUpdateBook: updateBook,
      onDeleteBook: deleteBook,
      isLoading,
      isDetailLoading,
      isError: error,
    }),
    [data?.data, data?.metadata, error, isLoading],
  )
}
