import { useEffect, useState } from 'react'

// What for: delay updating the value until typing pauses — shared by suggestions + list filter.
export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // What for: clear pending timer when value changes again.
    return () => {
      clearTimeout(timerId)
    }
  }, [value, delay])

  return debouncedValue
}
