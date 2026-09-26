import { useEffect, useRef, useState } from 'react'
import { useDebounce } from './hooks/useDebounce'
import type { Suggestion } from './types/suggestion'
import './App.css'

const SEARCH_URL = 'https://dummyjson.com/users/search'

function App() {
  // What for: controlled input value — what the user is typing right now.
  const [query, setQuery] = useState('')
  // What for: API results to show in the dropdown list.
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  // What for: show a loading indicator while the request is in flight.
  const [loading, setLoading] = useState(false)
  // What for: show an error message if the request fails.
  const [error, setError] = useState<string | null>(null)
  // What for: remember which suggestion the user clicked.
  const [selected, setSelected] = useState<Suggestion | null>(null)
  // What for: open/close the suggestions dropdown.
  const [isOpen, setIsOpen] = useState(false)

  // English: After selecting, query changes → debounce would search again and reopen "No users found".
  //          useRef skips that one request without putting flags in React state.
  const skipNextSearchRef = useRef(false)

  // English: Debounce the query so we don't hit the API on every keystroke.
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (skipNextSearchRef.current) {
      skipNextSearchRef.current = false
      return
    }

    // English: Skip empty/short queries — no pointless requests.
    if (debouncedQuery.trim().length < 2) {
      setSuggestions([])
      setLoading(false)
      setError(null)
      return
    }

    // English: AbortController — cancel in-flight request if query changes or component unmounts.
    const controller = new AbortController()

    async function fetchSuggestions() {
      try {
        setLoading(true)
        setError(null)

        // English: Native fetch — no extra dependency; enough for this live coding.
        const response = await fetch(
          `${SEARCH_URL}?q=${encodeURIComponent(debouncedQuery)}`,
          { signal: controller.signal },
        )

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data: { users: Suggestion[] } = await response.json()
        setSuggestions(data.users)
        setIsOpen(true)
      } catch (err) {
        // English: Ignore abort errors — expected when the user keeps typing.
        if (err instanceof DOMException && err.name === 'AbortError') {
          return
        }
        const message = err instanceof Error ? err.message : 'Something went wrong'
        setError(message)
        setSuggestions([])
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchSuggestions()

    return () => {
      controller.abort()
    }
  }, [debouncedQuery])

  function handleSelect(suggestion: Suggestion) {
    skipNextSearchRef.current = true
    setSelected(suggestion)
    setQuery(`${suggestion.firstName} ${suggestion.lastName}`)
    setSuggestions([])
    setIsOpen(false)
  }

  return (
    <main className="app">
      <h1>User autocomplete</h1>

      <label className="field">
        <span>Search users</span>
        <input
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setSelected(null)
            setIsOpen(true)
          }}
          onFocus={() => {
            if (suggestions.length > 0) {
              setIsOpen(true)
            }
          }}
          placeholder="Type at least 2 characters..."
          autoComplete="off"
        />
      </label>

      {loading && <p className="status">Loading...</p>}
      {error && <p className="status error">Error: {error}</p>}

      {isOpen && !selected && !loading && !error && debouncedQuery.trim().length >= 2 && (
        <ul className="suggestions">
          {suggestions.length === 0 ? (
            <li className="empty">No users found</li>
          ) : (
            // English: Stable id keys — index keys break when the list updates.
            suggestions.map((suggestion) => (
              <li key={suggestion.id}>
                <button type="button" onClick={() => handleSelect(suggestion)}>
                  <strong>
                    {suggestion.firstName} {suggestion.lastName}
                  </strong>
                  <span>{suggestion.email}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}

      {selected && (
        <p className="selected">
          Selected: {selected.firstName} {selected.lastName} ({selected.email})
        </p>
      )}
    </main>
  )
}

export default App
