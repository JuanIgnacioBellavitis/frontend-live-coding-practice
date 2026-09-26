import { useEffect, useState } from 'react'
import type { SortDirection, SortKey, User } from './types/user'
import './App.css'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'
const PAGE_SIZE = 5

function getSortValue(user: User, key: SortKey): string {
  switch (key) {
    case 'name':
      return user.name
    case 'email':
      return user.email
    case 'city':
      return user.address.city
    case 'company':
      return user.company.name
  }
}

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [page, setPage] = useState(1)

  // English: Fetch on mount — side effects belong in useEffect.
  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true)
        setError(null)

        // English: Native fetch — enough for a simple GET in live coding.
        const response = await fetch(USERS_URL)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data: User[] = await response.json()
        setUsers(data)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Something went wrong'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  // English: Pipeline = filter → sort → slice. All derived — no extra useState for each step.
  const filteredUsers = users.filter((user) => {
    const query = search.toLowerCase()
    if (!query) {
      return true
    }

    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.address.city.toLowerCase().includes(query) ||
      user.company.name.toLowerCase().includes(query)
    )
  })

  // English: Sorted list is derived — copy before sort because .sort() mutates.
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const left = getSortValue(a, sortKey).toLowerCase()
    const right = getSortValue(b, sortKey).toLowerCase()

    if (left < right) {
      return sortDirection === 'asc' ? -1 : 1
    }
    if (left > right) {
      return sortDirection === 'asc' ? 1 : -1
    }
    return 0
  })

  // English: Pagination is also derived — slice a window of the sorted array.
  const totalPages = Math.max(1, Math.ceil(sortedUsers.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const pageUsers = sortedUsers.slice(startIndex, startIndex + PAGE_SIZE)

  function handleSearchChange(value: string) {
    setSearch(value)
    // English: Reset page when filtering — otherwise you may land on an empty page.
    setPage(1)
  }

  function handleSort(key: SortKey) {
    // English: Same column → flip direction; new column → asc and reset to page 1.
    if (key === sortKey) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
    setPage(1)
  }

  function sortLabel(key: SortKey) {
    if (key !== sortKey) {
      return ''
    }
    return sortDirection === 'asc' ? ' ↑' : ' ↓'
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <main className="app">
      <h1>Sortable table</h1>

      <label className="search">
        <span>Search</span>
        <input
          type="text"
          value={search}
          onChange={(event) => handleSearchChange(event.target.value)}
          placeholder="Filter by name, email, city, company..."
        />
      </label>

      <table>
        <thead>
          <tr>
            <th>
              <button type="button" onClick={() => handleSort('name')}>
                Name{sortLabel('name')}
              </button>
            </th>
            <th>
              <button type="button" onClick={() => handleSort('email')}>
                Email{sortLabel('email')}
              </button>
            </th>
            <th>
              <button type="button" onClick={() => handleSort('city')}>
                City{sortLabel('city')}
              </button>
            </th>
            <th>
              <button type="button" onClick={() => handleSort('company')}>
                Company{sortLabel('company')}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {pageUsers.length === 0 ? (
            <tr>
              <td colSpan={4}>No users found</td>
            </tr>
          ) : (
            // English: Stable id keys — pagination/sort would break index keys.
            pageUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address.city}</td>
                <td>{user.company.name}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => setPage((current) => current - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
          {search.trim() ? ` · ${sortedUsers.length} result(s)` : ''}
        </span>
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => setPage((current) => current + 1)}
        >
          Next
        </button>
      </div>
    </main>
  )
}

export default App
