import { useEffect, useMemo, useState } from 'react'
import { searchMovies } from '../services/tmdb.js'
import useDebounce from '../hooks/useDebounce.js'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Loader from '../components/Loader.jsx'
import MovieCard from '../components/MovieCard.jsx'
import Pagination from '../components/Pagination.jsx'
import SearchBar from '../components/SearchBar.jsx'
import SkeletonCard from '../components/SkeletonCard.jsx'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [validationError, setValidationError] = useState(null)

  const debouncedQuery = useDebounce(query.trim(), 450)

  useEffect(() => {
    if (!debouncedQuery) {
      setResult(null)
      setError(null)
      setValidationError(null)
      setLoading(false)
      setPage(1)
      return
    }

    if (debouncedQuery.length < 2) {
      setResult(null)
      setError(null)
      setValidationError('Please enter at least 2 characters to search.')
      setLoading(false)
      return
    }

    let active = true
    setLoading(true)
    setError(null)

    searchMovies(debouncedQuery, page)
      .then((data) => {
        if (active) {
          setResult(data)
          setValidationError(null)
        }
      })
      .catch((fetchError) => {
        if (active) {
          setError(fetchError)
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [debouncedQuery, page])

  useEffect(() => {
    setPage(1)
  }, [debouncedQuery])

  const movies = result?.results || []
  const totalPages = result?.total_pages || 0

  const content = useMemo(() => {
    if (!debouncedQuery) {
      return <p className="empty-state">Start typing to search for movies.</p>
    }

    if (validationError) return <p className="validation-error">{validationError}</p>

    if (loading) {
      return (
        <div className="movie-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )
    }

    if (error) {
      return <ErrorMessage title="Search failed" message={error.message} retry={() => setPage(page)} />
    }

    if (movies.length === 0) {
      return <p className="empty-state">No movies matched your search.</p>
    }

    return (
      <>
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <Pagination currentPage={page} totalPages={totalPages} onChange={setPage} />
      </>
    )
  }, [debouncedQuery, error, loading, movies, page, totalPages])

  return (
    <main className="page page--search">
      <header className="page__header">
        <h1>Search movies</h1>
        <SearchBar value={query} onChange={setQuery} placeholder="Search for a title" />
      </header>
      {content}
    </main>
  )
}
