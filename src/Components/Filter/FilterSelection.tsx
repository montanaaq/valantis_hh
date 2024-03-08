import { FC, useState } from 'react'
import { FilterProps } from '../App/App'
import Filter from './Filter'
import { Link } from 'react-router-dom'

const FilterSelection: FC = () => {
  const [filter, setFilter] = useState<FilterProps>({
    name: '',
    price: null,
    brand: ''
  })
  const submittedFilters = Object.entries(filter).reduce(
    (acc: any, [key, value]) => {
      if (value !== '' && value !== null) {
        acc[key] = value
      }
      return acc
    },
    {}
  )
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}
      className="input_holder"
    >
      <Link
        to={'/'}
        style={{
          textDecoration: 'none',
          color: 'white'
        }}
        className="back"
      >
        Back to Home
      </Link>
      <input
        type="text"
        placeholder="Name"
        value={filter.name}
        onChange={e => setFilter({ ...filter, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={filter.price || ''}
        onChange={e =>
          setFilter({ ...filter, price: Number(e.target.value) || null })
        }
      />
      <input
        type="text"
        placeholder="Brand"
        value={filter.brand}
        onChange={e => setFilter({ ...filter, brand: e.target.value })}
      />
      <Filter filters={submittedFilters} />
    </div>
  )
}

export default FilterSelection
