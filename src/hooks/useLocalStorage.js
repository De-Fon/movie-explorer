import { useCallback, useState } from 'react'

export default function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback(
    (val) => {
      try {
        const valueToStore = typeof val === 'function' ? val(state) : val
        setState(valueToStore)
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch {}
    },
    [key, state],
  )

  return [state, setValue]
}
