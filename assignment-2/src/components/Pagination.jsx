import React, { useLayoutEffect, useState } from 'react'
import '../assets/styles/pagination.css'

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage: externalCurrentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const [currentPage, setCurrentPage] = useState(1)

  useLayoutEffect(() => {
    setCurrentPage(externalCurrentPage)
  }, [externalCurrentPage])

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
      onPageChange(newPage)
    }
  }

  const renderPageNumbers = () => {
    const pageNumbers = []

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <span
          key={i}
          onClick={() => handlePageChange(i)}
          className={i === currentPage ? 'active' : ''}
        >
          {i}
        </span>,
      )
    }

    return pageNumbers
  }

  return <div className="pagination">{renderPageNumbers()}</div>
}

export default Pagination
