'use client'

import ResponsivePagination from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'
import '../../app/pagination.css'

export interface PaginationProps {
  totalItems: number
  itemsPerPage: number
  currentPage?: number
  onPageChange?: (page: number) => void
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage: externalCurrentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handlePageClick = (page: number) => {
    onPageChange?.(page)
  }

  return (
    <ResponsivePagination
      maxWidth={400}
      current={externalCurrentPage}
      total={totalPages}
      onPageChange={handlePageClick}
    />
  )
}

export default Pagination
