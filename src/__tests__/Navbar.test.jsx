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
    expect(screen.getByLabelText(/Watchlist/i)).toBeInTheDocument()
  })
})
