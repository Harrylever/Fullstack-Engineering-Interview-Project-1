/* */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

/* */
import './index.css'
import AppRoutes from './AppRoutes.tsx'
import { AuthProvider, UiProvider } from './tools/context'
import Toaster from './components/shared/ui/toast/toaster.tsx'
import AuthMiddleware from './tools/middleware/authMiddleware.tsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <UiProvider>
            <AuthMiddleware>
              <Routes>
                <Route path="/*" element={<AppRoutes />} />
              </Routes>
              <Toaster />
            </AuthMiddleware>
          </UiProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)
