import { useEffect, useRef, useState } from 'react'
import { UserCard } from './components/UserCard'
import { useDebounce } from './hooks/useDebounce'
import type { SortOrder, User } from './types/user'
import './App.css'
import axios from 'axios'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

function App() {
  // What for: users from the API — source of truth for list + autocomplete.
  const [users, setUsers] = useState<User[]>([])
  // What for: initial fetch loading indicator.
  const [loading, setLoading] = useState(true)
  // What for: initial fetch error message.
  const [error, setError] = useState<string | null>(null)
  // What for: controlled search text typed in the autocomplete input.
  const [query, setQuery] = useState('')
  // What for: city filter from the user-directory exercise.
  const [selectedCity, setSelectedCity] = useState('all')
  // What for: sort order for the directory list.
  const [sortOrder, setSortOrder] = useState<SortOrder>('name-asc')
  // What for: user chosen from the autocomplete dropdown.
  const [selected, setSelected] = useState<User | null>(null)
  // What for: show/hide the suggestions panel.
  const [isOpen, setIsOpen] = useState(false)

  // What for: debounced query drives filtering — avoids filtering on every keystroke.
  const debouncedQuery = useDebounce(query, 300)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true)
        setError(null)

        // What for: Axios parses JSON into response.data and throws on 4xx/5xx.
        const { data } = await axios.get<User[]>(USERS_URL)
        setUsers(data)

      // --- Native fetch alternative (preferred in most live codings) ---
        // const response = await fetch(USERS_URL)
        // if (!response.ok) {
        //   throw new Error(`Request failed with status ${response.status}`)
        // }
        // const data: User[] = await response.json()
        // setUsers(data)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Something went wrong'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  // What for: close suggestions when clicking outside the search area.
  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
    }
  }, [])

  // What for: cities derived from users — no hardcoding.
  const cities = [...new Set(users.map((user) => user.address.city))].sort()

  // What for: shared filter pipeline for BOTH autocomplete suggestions and the directory list.
  //          Derived — do not store in another useState.
  const filteredUsers = users
    .filter((user) => {
      const q = debouncedQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        user.name.toLowerCase().includes(q) ||
        user.username.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q)

      const matchesCity =
        selectedCity === 'all' || user.address.city === selectedCity

      return matchesSearch && matchesCity
    })
    .slice()
    .sort((a, b) => {
      if (sortOrder === 'name-asc') {
        return a.name.localeCompare(b.name)
      }
      return b.name.localeCompare(a.name)
    })

  // What for: autocomplete shows a short preview; full directory shows all filtered rows.
  const suggestions = filteredUsers.slice(0, 5)

  function handleSelect(user: User) {
    setSelected(user)
    setQuery(user.name)
    setIsOpen(false)
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <main className="app">
      <h1>User directory + autocomplete</h1>
      <p className="subtitle">
        Debounced search powers the dropdown and the list below.
      </p>


    {/* SEARCH USERS WITH AUTOCOMPLETE AND SUGGESTIONS AND DEBOUNCE*/}
      <div className="search-wrap" ref={wrapRef}>
        <label className="search-label">
          <span>Search users</span>
          <input
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setSelected(null)
              setIsOpen(true)
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Type a name, username, or email..."
            autoComplete="off"
            aria-autocomplete="list"
            aria-expanded={isOpen}
          />
        </label>

        {isOpen && debouncedQuery.trim().length >= 1 && (
          <ul className="suggestions" role="listbox">
            {suggestions.length === 0 ? (
              <li className="empty">No users found</li>
            ) : (
              suggestions.map((user) => (
                <li key={user.id} role="option">
                  <button type="button" onClick={() => handleSelect(user)}>
                    <strong>{user.name}</strong>
                    <span>
                      @{user.username} · {user.email}
                    </span>
                  </button>
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      {/* SHOW SELECTED USER */}
      {/*selected && (
        <p className="selected-line">
          Selected: {selected.name} ({selected.email})
        </p>
      )}*/}

      {/* FILTER AND SORT USERS BY CITY AND NAME */}
      <div className="controls">
        <select
          value={selectedCity}
          onChange={(event) => setSelectedCity(event.target.value)}
          aria-label="Filter by city"
        >
          <option value="all">All cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value as SortOrder)}
          aria-label="Sort by name"
        >
          <option value="name-asc">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
        </select>
      </div>

      {filteredUsers.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul className="user-list">
          {filteredUsers.map((user) => (
            <li key={user.id}>
              <UserCard user={user} selected={selected?.id === user.id} />
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default App
