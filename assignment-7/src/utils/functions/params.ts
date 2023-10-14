import { ReadonlyURLSearchParams } from 'next/navigation'
import { ListParams } from '../../types'

export function getFilterBookParams(
  searchParams: ReadonlyURLSearchParams,
): Partial<ListParams> {
  return {
    pageSize: 5,
    page: Number(searchParams.get('page')) || 1,
    query: searchParams.get('q') || '',
  }
}
