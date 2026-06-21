import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider, useTheme } from '../context/ThemeContext.jsx'

function TestComponent() {
  const { theme, toggle, setTheme } = useTheme()
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggle}>Toggle</button>
      <button onClick={() => setTheme('light')}>Set Light</button>
    </div>
  )
}

describe('ThemeContext', () => {
  beforeEach(() => {
    window.localStorage.clear()
    jest.restoreAllMocks()
    document.documentElement.className = ''
  })

  it('throws an error when useTheme is used outside ThemeProvider', () => {
    const ConsoleError = console.error
    console.error = jest.fn() // suppress console error output for expected exception
    expect(() => render(<TestComponent />)).toThrow(
      'useTheme must be used within ThemeProvider'
    )
    console.error = ConsoleError
  })

  it('defaults to dark theme when no localStorage is present', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    expect(screen.getByTestId('theme').textContent).toBe('dark')
    expect(document.documentElement.classList.contains('theme-dark')).toBe(true)
  })

  it('uses theme from localStorage if valid', () => {
    window.localStorage.setItem('movie-explorer-theme', 'light')
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    expect(screen.getByTestId('theme').textContent).toBe('light')
    expect(document.documentElement.classList.contains('theme-dark')).toBe(false)
  })

  it('falls back to prefers-color-scheme if window.matchMedia is available', () => {
    // mock matchMedia
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    expect(screen.getByTestId('theme').textContent).toBe('dark')
  })

  it('handles localStorage errors gracefully during initialization', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Storage disabled')
    })
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    expect(screen.getByTestId('theme').textContent).toBe('dark')
  })

  it('handles localStorage errors gracefully during setItem', () => {
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage full')
    })
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    // Toggling theme should work even if localStorage setItem fails
    fireEvent.click(screen.getByText('Toggle'))
    expect(screen.getByTestId('theme').textContent).toBe('light')
  })

  it('toggles theme when toggle function is called', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    expect(screen.getByTestId('theme').textContent).toBe('dark')
    fireEvent.click(screen.getByText('Toggle'))
    expect(screen.getByTestId('theme').textContent).toBe('light')
    expect(document.documentElement.classList.contains('theme-dark')).toBe(false)
    fireEvent.click(screen.getByText('Toggle'))
    expect(screen.getByTestId('theme').textContent).toBe('dark')
    expect(document.documentElement.classList.contains('theme-dark')).toBe(true)
  })
})
