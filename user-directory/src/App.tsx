import { useEffect, useState } from 'react'
import axios from 'axios'
import { UserCard } from './components/UserCard'
import type { User } from './types/user'
import './App.css'

type SortOrder = 'name-asc' | 'name-desc'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

function App() {
  // What for: users returned from the API (source of truth for the list).
  const [users, setUsers] = useState<User[]>([])
  // What for: show Loading... while the initial fetch is in progress.
  const [loading, setLoading] = useState(true)
  // What for: show an error message if the fetch fails.
  const [error, setError] = useState<string | null>(null)
  // What for: controlled search input (name / username / email).
  const [search, setSearch] = useState('')
  // What for: city dropdown filter (`all` or a specific city).
  const [selectedCity, setSelectedCity] = useState('all')
  // What for: sort direction for the list (name A-Z or Z-A).
  const [sortOrder, setSortOrder] = useState<SortOrder>('name-asc')

  // English: Fetch on mount with useEffect — side effects belong here, not in render.
  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true)
        setError(null)

        // English: Axios demo — parses JSON for you (response.data) and throws on 4xx/5xx,
        //          so you usually don't need `if (!response.ok)`. Needs an npm dependency.
        //          In a live coding, prefer native fetch unless the project already uses Axios.
        //const { data } = await axios.get<User[]>(USERS_URL)
        //setUsers(data)

        // --- Native fetch alternative (preferred in most live codings) ---
         const response = await fetch(USERS_URL)
         if (!response.ok) {
           throw new Error(`Request failed with status ${response.status}`)
         }
         const data: User[] = await response.json()
         setUsers(data)
      } catch (err) {
        // English: Axios errors often include response.status; keep a simple fallback message.
        const message = err instanceof Error ? err.message : 'Something went wrong'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  // English: FILTERS. Cities derived from users (map + Set + sort). No hardcoding, no extra state.
  const cities = [...new Set(users.map((user) => user.address.city))].sort()

  // English: FILTERS. Filtered list is derived state — this should not be stored in another useState.
  //          Storing it would duplicate data and risk getting out of sync with users/search/city.
  const filteredUsers = users
    .filter((user) => {
      const query = search.toLowerCase()
      const matchesSearch =
        user.name.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)

      const matchesCity =
        selectedCity === 'all' || user.address.city === selectedCity

      return matchesSearch && matchesCity
    })
    // English: [...users].sort — copy first because .sort() mutates the original array.
    .slice()
    .sort((a, b) => {
      if (sortOrder === 'name-asc') {
        return a.name.localeCompare(b.name)
      }
      return b.name.localeCompare(a.name)
    })

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <main className="app">
      <h1>Users</h1>

      {/** Filtros y ordenamiento */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search users"
        />

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
          {/* English: Use user.id as key — stable and unique. Index keys break on reorder/filter. */}
          {filteredUsers.map((user) => (
            <li key={user.id}>
              <UserCard user={user} />
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default App
