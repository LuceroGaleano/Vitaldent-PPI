import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {MainApp} from './MainApp.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider.jsx'
import './formValidation.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
