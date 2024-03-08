import { FC, useState } from 'react'
import { FilterProps, ProductsProps } from '../App/App'
import { md5Hash } from '../../Services/Authorize.service'

interface FilterComponentProps {
  filters: FilterProps
}

const Filter: FC<FilterComponentProps> = ({ filters }) => {
  const [filteredProducts, setFilteredProducts] = useState<ProductsProps[]>([])

  const filterProducts = async (filters: FilterProps) => {
    try {
      const response = await fetch('http://api.valantis.store:40000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth': md5Hash
        },
        body: JSON.stringify({
          action: 'filter',
          params: filters
        })
      })
      const dataIds = await response.json()
      const responseItems = await fetch('http://api.valantis.store:40000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth': md5Hash
        },
        body: JSON.stringify({
          action: 'get_items',
          params: { ids: dataIds.result }
        })
      })
      const dataItems = await responseItems.json()
      if (dataItems && dataItems.result) {
        setFilteredProducts(dataItems.result)
      } else {
        return <p>Loading...</p>
      }
    } catch (e) {
      console.log(`Error on filtering data: ${e}`)
    }
  }

  return (
    <div>
      <div
        style={{
          width: '100%'
        }}
      >
        <button
          onClick={() => filterProducts(filters)}
          style={{
            marginLeft: '20px'
          }}
        >
          Filter
        </button>
        {filteredProducts ? (
          <div
            style={{
              display: 'grid',
              placeItems: 'center',
              gridTemplateColumns: 'repeat(4, 400px)',
              maxWidth: '100%',
              marginLeft: '50px'
            }}
          >
            {filteredProducts.map((product: any, index: number) => (
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
            ))}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default Filter
