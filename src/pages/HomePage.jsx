import { useEffect, useMemo, useRef, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import useDebounce from '../hooks/useDebounce.js'
import {
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getUpcomingMovies,
  getDiscoverMovies,
} from '../services/tmdb.js'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Loader from '../components/Loader.jsx'
import MovieCard from '../components/MovieCard.jsx'
import SkeletonCard from '../components/SkeletonCard.jsx'

const sectionConfig = [
  { key: 'trending', title: 'Trending', fetcher: getTrendingMovies },
  { key: 'popular', title: 'Popular', fetcher: getPopularMovies },
  { key: 'topRated', title: 'Top Rated', fetcher: getTopRatedMovies },
  { key: 'upcoming', title: 'Upcoming', fetcher: getUpcomingMovies },
]

function MovieSection({ section, filters }) {
  const { title, fetcher, key } = section
  const sentinelRef = useRef(null)

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['section', key],
    queryFn: ({ pageParam = 1 }) => fetcher(pageParam),
    getNextPageParam: (last) => {
      return last.page < (last.total_pages || 1) ? last.page + 1 : undefined
    },
  })

  useEffect(() => {
    if (!sentinelRef.current) return
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    }, { rootMargin: '400px' })
    obs.observe(sentinelRef.current)
    return () => obs.disconnect()
  }, [sentinelRef.current, hasNextPage, isFetchingNextPage])

  if (isLoading) {
    return (
      <section className="movie-section">
        <div className="movie-section__header">
          <h2>{title}</h2>
        </div>
        <div className="movie-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    )
  }

  if (isError) {
    return (
      <section className="movie-section">
        <div className="movie-section__header">
          <h2>{title}</h2>
        </div>
        <ErrorMessage title={`Unable to load ${title}`} />
      </section>
    )
  }

  const pages = data?.pages || []
  let movies = pages.flatMap((p) => p.results || [])

  // apply lightweight client-side filters
  if (filters.minRating) {
    movies = movies.filter((m) => (m.vote_average || 0) >= Number(filters.minRating))
  }
  if (filters.year) {
    movies = movies.filter((m) => m.release_date?.startsWith(String(filters.year)))
  }
  if (filters.sortBy === 'rating') {
    movies = movies.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0))
  } else if (filters.sortBy === 'release_date') {
    movies = movies.sort((a, b) => (b.release_date || '').localeCompare(a.release_date || ''))
  }

  return (
    <section className="movie-section">
      <div className="movie-section__header">
        <h2>{title}</h2>
      </div>
      {movies.length === 0 ? (
        <p className="empty-state">No movies were found.</p>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={`${key}-${movie.id}`} movie={movie} />
          ))}
        </div>
      )}
      <div ref={sentinelRef} style={{ height: 1 }} />
    </section>
  )
}

function DiscoverSection({ filters }) {
  const sentinelRef = useRef(null)

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['discover', filters.sortBy, filters.minRating, filters.year],
    queryFn: ({ pageParam = 1 }) => getDiscoverMovies(pageParam, filters),
    getNextPageParam: (last) => (last.page < (last.total_pages || 1) ? last.page + 1 : undefined),
  })

  useEffect(() => {
    if (!sentinelRef.current) return
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    }, { rootMargin: '400px' })
    obs.observe(sentinelRef.current)
    return () => obs.disconnect()
  }, [sentinelRef.current, hasNextPage, isFetchingNextPage])

  if (isLoading) {
    return (
      <section className="movie-section">
        <div className="movie-section__header">
          <h2>Discover</h2>
        </div>
        <div className="movie-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    )
  }

  if (isError) {
    return (
      <section className="movie-section">
        <div className="movie-section__header">
          <h2>Discover</h2>
        </div>
        <ErrorMessage title="Unable to load Discover results" />
      </section>
    )
  }

  const pages = data?.pages || []
  const movies = pages.flatMap((p) => p.results || [])

  return (
    <section className="movie-section">
      <div className="movie-section__header">
        <h2>Discover</h2>
      </div>
      {movies.length === 0 ? (
        <p className="empty-state">No movies match your filters.</p>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={`discover-${movie.id}`} movie={movie} />
          ))}
        </div>
      )}
      <div ref={sentinelRef} style={{ height: 1 }} />
    </section>
  )
}

export default function HomePage() {
  const [filters, setFilters] = useState({ sortBy: 'popularity', minRating: 0, year: '' })
  const debouncedFilters = useDebounce(filters, 500)

  return (
    <main className="page page--home">
      <header className="page__header">
        <h1>Discover movies</h1>
        <p>Browse trending, popular, top rated, and upcoming releases from TMDB.</p>
        <div className="home-filters">
          <label>
            Sort:
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters((f) => ({ ...f, sortBy: e.target.value }))}
            >
              <option value="popularity">Popularity</option>
              <option value="rating">Rating</option>
              <option value="release_date">Release Date</option>
            </select>
          </label>
          <label>
            Min Rating:
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              placeholder="0"
              value={filters.minRating}
              onChange={(e) => {
                const v = e.target.value === '' ? '' : Number(e.target.value)
                const clamped = v === '' ? '' : Math.max(0, Math.min(10, v))
                setFilters((f) => ({ ...f, minRating: clamped }))
              }}
            />
          </label>
          <label>
            Year:
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={filters.year}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, '').slice(0, 4)
                setFilters((f) => ({ ...f, year: raw }))
              }}
              placeholder="YYYY"
            />
          </label>
        </div>
      </header>
      <DiscoverSection filters={debouncedFilters} />
      {sectionConfig.map((section) => (
        <MovieSection key={section.key} section={section} filters={filters} />
      ))}
    </main>
  )
}
