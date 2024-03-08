import ReactDOM from 'react-dom/client'
import Router from './Components/Router/Router.tsx'
import './index.css'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </React.StrictMode>
)
