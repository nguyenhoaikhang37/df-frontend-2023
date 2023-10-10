export interface Pagination {
  hasNext: boolean
  page: number
  pageSize: number
  sort: number
  totalPages: number
  totalRecords: number
}

export interface ListResponse<T> {
  data: Array<T>
  metadata: Pagination
}

export interface ResponseWithData<T> {
  data: T
}

export interface ListParams {
  page: number
  pageSize: number
  sort: string
  query: string
  topicId: number
}
