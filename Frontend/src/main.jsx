import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import CustomerContextProvider from './context/CustomerContextProvider.jsx'
import VendorContextProvider from './context/VendorContextProvider.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VendorContextProvider>
    <CustomerContextProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </CustomerContextProvider>
    </VendorContextProvider>
  </StrictMode>,
)
