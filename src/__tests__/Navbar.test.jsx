import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import { ThemeProvider } from '../context/ThemeContext.jsx'

describe('Navbar', () => {
  it('renders logo and watchlist link', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </ThemeProvider>
    )

    expect(screen.getByLabelText(/Movie Explorer home/i)).toBeInTheDocument()
    const watchlistLinks = screen.getAllByLabelText(/Watchlist/i)
    expect(watchlistLinks.length).toBeGreaterThan(0)
    expect(watchlistLinks[0]).toBeInTheDocument()
  })
})
