import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import FavoriteButton from '../components/FavoriteButton'

describe('FavoriteButton', () => {
  it('renders without crashing', () => {
    render(<FavoriteButton />)
  })

  it('renders inactive state by default', () => {
    render(<FavoriteButton />)
    const btn = screen.getByRole('button', { name: /add to favorites/i })
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveTextContent('Favorite')
    expect(btn).toHaveAttribute('aria-pressed', 'false')
    expect(btn).not.toHaveClass('favorite-button--active')
  })

  it('renders active state when active prop is true', () => {
    render(<FavoriteButton active={true} />)
    const btn = screen.getByRole('button', { name: /remove from favorites/i })
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveTextContent('Remove')
    expect(btn).toHaveAttribute('aria-pressed', 'true')
    expect(btn).toHaveClass('favorite-button--active')
  })

  it('calls onClick callback when clicked', () => {
    const handleClick = jest.fn()
    render(<FavoriteButton onClick={handleClick} />)
    const btn = screen.getByRole('button')
    fireEvent.click(btn)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders custom children and aria-label if provided', () => {
    render(
      <FavoriteButton ariaLabel="Custom Label">
        <span>Custom Content</span>
      </FavoriteButton>
    )
    const btn = screen.getByRole('button', { name: 'Custom Label' })
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveTextContent('Custom Content')
  })
})
