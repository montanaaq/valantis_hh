import { FC, useState } from 'react'
import { ProductsProps } from './App'

interface PaginationProps {
  isLoaded: boolean
}

const Pagination: FC<PaginationProps> = ({ isLoaded }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 50

  const visiblePages = 1
  const pageNumbers: React.ReactNode[] = []

  const allProducts = JSON.parse(localStorage.getItem('products')!)
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const currentProducts: ProductsProps[] = allProducts.slice(
    startIndex,
    endIndex
  )
  const totalProducts = localStorage.getItem('products')
    ? JSON.parse(localStorage.getItem('products')!).length
    : 0
  const totalPages = Math.ceil(totalProducts / productsPerPage)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }
  const renderPageNumber = (pageNumber: number, label: string) => {
    return (
      <button key={pageNumber} onClick={() => handlePageChange(pageNumber)}>
        {label}
      </button>
    )
  }

  const renderEllipsis = (key: string) => {
    return <span key={key}>...</span>
  }

  if (totalPages <= visiblePages * 2 + 1) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(renderPageNumber(i, i.toString()))
    }
  } else {
    let startPage = Math.max(1, currentPage - visiblePages)
    let endPage = Math.min(totalPages, currentPage + visiblePages)

    if (endPage - startPage < visiblePages * 2) {
      if (currentPage < totalPages / 2) {
        endPage = Math.min(
          totalPages,
          endPage + visiblePages - (endPage - startPage)
        )
      } else {
        startPage = Math.max(
          1,
          startPage - (visiblePages * 2 - (endPage - startPage))
        )
      }
    }

    if (startPage > 1) {
      pageNumbers.push(renderPageNumber(1, '1'))
      if (startPage > 2) {
        pageNumbers.push(renderEllipsis('leftEllipsis'))
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(renderPageNumber(i, i.toString()))
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(renderEllipsis('rightEllipsis'))
      }
      pageNumbers.push(renderPageNumber(totalPages, totalPages.toString()))
    }
  }
  return (
    <>
      {isLoaded ? (
        <>
          <div
            style={{
              display: 'grid',
              placeItems: 'center',
              gridTemplateColumns: 'repeat(4, 400px)'
            }}
          >
            {localStorage.getItem('products') ? (
              (currentProducts as any).map((product: any, index: number) => (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: '10px',
                    margin: '20px',
                    maxWidth: '250px',
                    maxHeight: '300px',
                    background: 'rgba(0,0,0,0.1)',
                    borderRadius: '10px',
                    padding: '20px',
                    border: '0.5px solid rgba(255, 255, 255, 0.3)'
                  }}
                  key={index}
                >
                  {product.brand ? (
                    <div key={`${product.id}_brand`}>
                      Brand: <b>{product.brand}</b>
                    </div>
                  ) : null}
                  <div key={`${product.id}_name`}>
                    Name: <b>{product.product}</b>
                  </div>
                  <div key={`${product.id}_price`}>
                    Price: <b>{product.price}₽</b>
                  </div>
                  <button key={`${product.id}_cart`}>Add to cart</button>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '20px',
              paddingBottom: '20px',
              gap: '10px'
            }}
          >
            {pageNumbers}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

export default Pagination
