import { Routes, Route } from 'react-router-dom'
import FilterSelection from '../Filter/FilterSelection'
import App from '../App/App'

const Router = () => {
  return (
    <Routes>
      <Route
        index
        path="/"
        element={<App />}
      ></Route>
      <Route path="/filter" element={<FilterSelection />}></Route>
    </Routes>
  )
}

export default Router
