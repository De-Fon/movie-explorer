import React, { useState } from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import useDebounce from '../hooks/useDebounce'

describe('useDebounce', () => {
  function TestComponent({ initialValue, delay }) {
    const [val, setVal] = useState(initialValue)
    const debounced = useDebounce(val, delay)
    return (
      <div>
        <span data-testid="debounced">{debounced}</span>
        <button onClick={() => setVal('changed')}>Change</button>
      </div>
    )
  }

  it('debounces value updates', async () => {
    render(<TestComponent initialValue="hello" delay={50} />)

    expect(screen.getByTestId('debounced').textContent).toBe('hello')

    // Click change
    fireEvent.click(screen.getByText('Change'))

    // Value should still be 'hello' immediately
    expect(screen.getByTestId('debounced').textContent).toBe('hello')

    // Wait for the debounce delay to pass
    await waitFor(() => {
      expect(screen.getByTestId('debounced').textContent).toBe('changed')
    })
  })
})
