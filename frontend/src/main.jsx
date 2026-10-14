import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MainApp from './MainApp.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  </StrictMode>,
)
