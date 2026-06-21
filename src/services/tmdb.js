/*
  🍽️ services/tmdb.js — "The API Connector"
  Contains functions that call The Movie Database (TMDB) API such as
  `getPopularMovies`, `searchMovies`, and `getMovieDetails`. Handles
  request errors and provides helper functions for image URLs.
*/
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: 'en-US',
  },
})

const fetchData = async (request) => {
  try {
    const response = await request()
    return response.data
  } catch (error) {
    const message = error?.response?.data?.status_message || error.message || 'Failed to fetch TMDB data.'
    throw new Error(message)
  }
}

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'
export const posterUrl = (path, size = 'w342') => (path ? `${IMAGE_BASE_URL}/${size}${path}` : null)
export const backdropUrl = (path, size = 'w780') => (path ? `${IMAGE_BASE_URL}/${size}${path}` : null)

export const getTrendingMovies = (page = 1) =>
  fetchData(() => api.get('/trending/movie/week', { params: { page } }))

export const getPopularMovies = (page = 1) =>
  fetchData(() => api.get('/movie/popular', { params: { page } }))

export const getTopRatedMovies = (page = 1) =>
  fetchData(() => api.get('/movie/top_rated', { params: { page } }))

export const getUpcomingMovies = (page = 1) =>
  fetchData(() => api.get('/movie/upcoming', { params: { page } }))

export const searchMovies = (query, page = 1) =>
  fetchData(() =>
    api.get('/search/movie', {
      params: {
        query,
        page,
        include_adult: false,
      },
    }),
  )

export const getMovieDetails = (id) =>
  fetchData(() => api.get(`/movie/${id}`, { params: { append_to_response: 'videos' } }))

export const getMovieCredits = (id) =>
  fetchData(() => api.get(`/movie/${id}/credits`))

export const getSimilarMovies = (id, page = 1) =>
  fetchData(() => api.get(`/movie/${id}/similar`, { params: { page } }))

export const getDiscoverMovies = (page = 1, { sortBy = 'popularity', minRating = 0, year = '' } = {}) => {
  const sortMap = {
    popularity: 'popularity.desc',
    rating: 'vote_average.desc',
    release_date: 'primary_release_date.desc',
  }
  const params = {
    page,
    sort_by: sortMap[sortBy] || sortMap.popularity,
    'vote_average.gte': Number(minRating) || 0,
  }
  if (year) params.primary_release_year = year
  return fetchData(() => api.get('/discover/movie', { params }))
}
