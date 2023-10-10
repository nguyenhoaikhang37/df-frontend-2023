'use client'

import ResponsivePagination from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'
import '../../app/pagination.css'

export interface PaginationProps {
  totalPages: number
  currentPage?: number
  onPageChange?: (page: number) => void
}

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageClick = (page: number) => {
    onPageChange?.(page)
  }

  return (
    <ResponsivePagination
      maxWidth={400}
      current={currentPage}
      total={totalPages}
      onPageChange={handlePageClick}
    />
  )
}

export default Pagination
