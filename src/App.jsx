import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { WatchlistProvider } from './context/WatchlistContext.jsx'
import Loader from './components/Loader.jsx'
import Navbar from './components/Navbar.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import NetworkStatusBanner from './components/NetworkStatusBanner.jsx'

const HomePage = lazy(() => import('./pages/HomePage.jsx'))
const SearchPage = lazy(() => import('./pages/SearchPage.jsx'))
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage.jsx'))
const FavoritesPage = lazy(() => import('./pages/FavoritesPage.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'))
const WatchlistPage = lazy(() => import('./pages/WatchlistPage.jsx'))

export default function App() {
  return (
    <FavoritesProvider>
      <WatchlistProvider>
        <ThemeProvider>
          <BrowserRouter>
            <a href="#main" className="skip-link">
              Skip to content
            </a>
            <div className="app-shell">
              <Navbar />
              <NetworkStatusBanner />
              <main id="main" className="page" role="main">
                <ErrorBoundary>
                  <Suspense fallback={<Loader message="Loading page…" />}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/search" element={<SearchPage />} />
                      <Route path="/movie/:id" element={<MovieDetailsPage />} />
                      <Route path="/favorites" element={<FavoritesPage />} />
                      <Route path="/watchlist" element={<WatchlistPage />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </Suspense>
                </ErrorBoundary>
              </main>
            </div>
          </BrowserRouter>
        </ThemeProvider>
      </WatchlistProvider>
    </FavoritesProvider>
  )
}
