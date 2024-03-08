import { FC, useState, useEffect } from 'react'
import { md5Hash } from '../../Services/Authorize.service'
import { Link } from 'react-router-dom'
import Pagination from './Pagination'

export type ProductsProps = {
  id: string
  name: string
  price: number
  brand: string
}

export type FilterProps = {
  name?: string
  price?: number | null
  brand?: string
}

const App: FC = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const localStorageProducts = localStorage.getItem('products')
        if (!localStorageProducts) {
          const responseIds = await fetch('http://api.valantis.store:40000/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Auth': md5Hash
            },
            body: JSON.stringify({
              action: 'get_ids',
              params: { offset: 1, limit: 450 }
            })
          })
          if (!responseIds.ok) {
            throw new Error('Error fetching product IDs')
          }

          const dataIds = await responseIds.json()

          const responseItems = await fetch(
            'http://api.valantis.store:40000/',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Auth': md5Hash
              },
              body: JSON.stringify({
                action: 'get_items',
                params: { ids: dataIds.result }
              })
            }
          )
          if (!responseItems.ok) {
            throw new Error('Error fetching product items')
          }

          const dataItems = await responseItems.json()
          localStorage.setItem('products', JSON.stringify(dataItems.result))
        }
      } catch (error) {
        setError(`Error loading data: ${error}`)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  if (error) {
    return <p>{error}</p>
  }

  if (loading) {
    return <p>Loading...</p>
  }
  return (
    <>
      <div>
        <div
          style={{
            height: '80px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Link to="/filter" className="filter_link">
            Filter
          </Link>
        </div>
        <Pagination isLoaded={!loading} />
      </div>
    </>
  )
}

export default App
