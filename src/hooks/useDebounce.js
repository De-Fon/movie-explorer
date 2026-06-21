/*
  ⏱️ useDebounce.js — "The Patience Timer"
  Returns a debounced value that updates after the user stops changing the
  input for `delay` milliseconds. Useful to limit API calls while typing.
*/
import { useEffect, useState } from 'react'

export default function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => window.clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}
