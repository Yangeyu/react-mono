import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/theme-provider/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <NextUIProvider className="h-full">
        <App />
      </NextUIProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
