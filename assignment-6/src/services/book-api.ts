import {
  Book,
  BookPayload,
  ListResponse,
  ResponseWithData,
  ListParams,
} from '../types'
import axiosClient from './axios-client'

export const bookApi = {
  get(id: number | string): Promise<ResponseWithData<Book>> {
    console.log('🚀 ~ file: book-api.ts:12 ~ get ~ id:', id)
    return axiosClient.get(`/books/${id}`)
  },

  getAll(params: Partial<ListParams>): Promise<ListResponse<Book>> {
    return axiosClient.get('/books', { params })
  },

  add(payload: BookPayload): Promise<ResponseWithData<Book>> {
    return axiosClient.post('/books', payload)
  },

  update(
    id: number | string,
    payload: BookPayload,
  ): Promise<ResponseWithData<Book>> {
    return axiosClient.put(`/books/${id}`, payload)
  },

  delete(id: number | string) {
    return axiosClient.delete(`/books/${id}`)
  },
}
