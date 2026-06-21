import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import HomePage from '../pages/HomePage.jsx'
import { ThemeProvider } from '../context/ThemeContext.jsx'

jest.mock('../services/tmdb.js', () => ({
  getDiscoverMovies: jest.fn(() => Promise.resolve({ page: 1, total_pages: 1, results: [] })),
}))

function renderWithProviders(ui) {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={qc}>
      <ThemeProvider>
        <MemoryRouter>{ui}</MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

describe('HomePage', () => {
  it('renders filters and heading', async () => {
    renderWithProviders(<HomePage />)
    expect(screen.getByRole('heading', { name: /Discover movies/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/Min Rating/i)).toBeInTheDocument()
    await waitFor(() => expect(screen.getByText(/No movies match your filters.|No movies were found.|/i)))
  })
})
