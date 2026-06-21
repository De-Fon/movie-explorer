/**
 * 🎬 main.jsx — "The Stage Manager"
 * This script wakes up React. It sets up the "memory helpers" (React Query)
 * so the app remembers data it fetches, and then it injects your main App
 * component into the empty <div id="root"> in index.html.
 * It also turns on "offline mode" by registering the Service Worker.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)

// Register a simple service worker if available
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}
