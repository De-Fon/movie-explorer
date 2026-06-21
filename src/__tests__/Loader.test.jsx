import React from 'react'
import { render, screen } from '@testing-library/react'
import Loader from '../components/Loader'

describe('Loader', () => {
  it('renders without crashing', () => {
    render(<Loader />)
  })

  it('renders default message when no message is provided', () => {
    render(<Loader />)
    expect(screen.getByText('Loading…')).toBeInTheDocument()
  })

  it('renders custom message when provided', () => {
    render(<Loader message="Fetching data..." />)
    expect(screen.getByText('Fetching data...')).toBeInTheDocument()
  })

  it('has correct role and aria attributes for accessibility', () => {
    const { container } = render(<Loader />)
    const loaderDiv = container.querySelector('.loader')
    expect(loaderDiv).toBeInTheDocument()
    expect(loaderDiv).toHaveAttribute('role', 'status')
    expect(loaderDiv).toHaveAttribute('aria-live', 'polite')
  })
})
