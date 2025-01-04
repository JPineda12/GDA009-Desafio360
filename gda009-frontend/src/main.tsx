import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { NotificationProvider } from './shared/context/NotificationProvider.tsx'
import { AuthProvider } from './shared/context/AuthContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './shared/context/ShoppingCartContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <NotificationProvider>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </NotificationProvider>
    </BrowserRouter>
  </StrictMode>,
)
