import { useEffect, useState } from 'react'

// English: Custom hook — delays updating `value` until the user stops typing for `delay` ms.
export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // English: clearTimeout on cleanup — avoids firing stale updates if value changes again.
    const timerId = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timerId)
    }
  }, [value, delay])

  return debouncedValue
}
