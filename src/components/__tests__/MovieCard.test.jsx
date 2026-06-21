import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import MovieCard from '../MovieCard.jsx'

const sampleMovie = {
  id: 123,
  title: 'The Test Movie',
  poster_path: '/test.jpg',
  vote_average: 7.5,
  release_date: '2020-01-01',
}

describe('MovieCard', () => {
  test('renders title and rating', () => {
    render(
      <MemoryRouter>
        <MovieCard movie={sampleMovie} />
      </MemoryRouter>,
    )

    expect(screen.getByText(/The Test Movie/i)).toBeInTheDocument()
    expect(screen.getByText(/7.5/)).toBeInTheDocument()
  })

  test('uses fallback poster when poster_path is null', () => {
    const movieWithoutPoster = {
      ...sampleMovie,
      poster_path: null,
    }

    render(
      <MemoryRouter>
        <MovieCard movie={movieWithoutPoster} />
      </MemoryRouter>,
    )

    const img = screen.getByRole('img', { name: /poster for the test movie/i })
    expect(img).toHaveAttribute('src', '/fallback-poster.jpg')
  })
})
