import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ErrorMessage from '../components/ErrorMessage'

describe('ErrorMessage', () => {
  it('renders with default title', () => {
    render(<ErrorMessage />)
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('renders custom title and message', () => {
    render(<ErrorMessage title="Custom Title" message="Custom Error Message" />)
    expect(screen.getByText('Custom Title')).toBeInTheDocument()
    expect(screen.getByText('Custom Error Message')).toBeInTheDocument()
  })

  it('renders retry button and triggers callback when clicked', () => {
    const handleRetry = jest.fn()
    render(<ErrorMessage retry={handleRetry} />)
    const btn = screen.getByRole('button', { name: /try again/i })
    expect(btn).toBeInTheDocument()
    fireEvent.click(btn)
    expect(handleRetry).toHaveBeenCalledTimes(1)
  })
})
