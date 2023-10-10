'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useDebounce } from 'usehooks-ts'
import { Container, SearchInput } from '../../components/common'
import { AddEditBookDialog } from '../../components/dialog'
import { BookTable } from '../../components/home'
import { ListParams } from '../../types'
import { useBookSWR } from '../../utils/hooks/apis'

export default function BookHome() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const filters: Partial<ListParams> = {
    pageSize: 5,
    page: Number(searchParams.get('page')) || 1,
    query: searchParams.get('q') || '',
  }

  const { bookList, metaData } = useBookSWR({ params: filters })

  const [searchValue, setSearchValue] = useState(searchParams.get('q') || '')
  const debouncedValue = useDebounce(searchValue, 250)

  const searchedBooks = useMemo(() => {
    if (bookList?.length === 0) return []

    const filteredList = bookList?.filter((book) => {
      const bookTitle = book.name.toLowerCase()
      const searchValueLower = searchValue.toLowerCase()

      return bookTitle.includes(searchValueLower)
    })

    return filteredList!
  }, [bookList, searchValue])

  useEffect(() => {
    console.log('🚀 1', debouncedValue)

    if (debouncedValue.trim() === '') {
      console.log('🚀 2', debouncedValue)
      // remove search param from url
      const params = new URLSearchParams(searchParams)

      params.delete('q')

      router.push(`${pathname}?${params.toString()}`)
    } else {
      const params = new URLSearchParams(searchParams)

      params.set('q', debouncedValue)
      params.set('page', '1')

      router.push(`${pathname}?${params.toString()}`)
    }
  }, [debouncedValue])

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
            <AddEditBookDialog />
          </div>
        </div>

        <BookTable bookList={searchedBooks} metaData={metaData} />
      </Container>
    </main>
  )
}
