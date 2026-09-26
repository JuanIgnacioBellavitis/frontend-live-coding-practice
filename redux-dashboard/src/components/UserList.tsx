import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectUser, setSearch } from '../store/usersSlice'
import {
  selectFilteredUsers,
  selectSearch,
  selectSelectedId,
  selectUsersError,
  selectUsersLoading,
} from '../store/selectors'

export function UserList() {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectFilteredUsers)
  const search = useAppSelector(selectSearch)
  const selectedId = useAppSelector(selectSelectedId)
  const loading = useAppSelector(selectUsersLoading)
  const error = useAppSelector(selectUsersError)

  if (loading) {
    return <p>Loading users...</p>
  }

  if (error) {
    return <p className="error">Error: {error}</p>
  }

  return (
    <section className="panel">
      <h2>Users</h2>

      <input
        type="text"
        value={search}
        onChange={(event) => dispatch(setSearch(event.target.value))}
        placeholder="Search users..."
        aria-label="Search users"
      />

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul className="user-list">
          {/* What for: stable id keys — selection/filter would break index keys. */}
          {users.map((user) => (
            <li key={user.id}>
              <button
                type="button"
                className={user.id === selectedId ? 'active' : undefined}
                onClick={() => dispatch(selectUser(user.id))}
              >
                <strong>{user.name}</strong>
                <span>{user.email}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
