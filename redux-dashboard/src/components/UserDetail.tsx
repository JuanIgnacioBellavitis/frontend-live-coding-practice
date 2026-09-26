import { useAppDispatch, useAppSelector } from '../store/hooks'
import { clearSelection } from '../store/usersSlice'
import { selectSelectedUser } from '../store/selectors'

// What for: second consumer of the same Redux state — proves the store is shared.
export function UserDetail() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectSelectedUser)

  if (!user) {
    return (
      <section className="panel">
        <h2>Details</h2>
        <p>Select a user to see details.</p>
      </section>
    )
  }

  return (
    <section className="panel">
      <h2>Details</h2>
      <p>
        <strong>{user.name}</strong> (@{user.username})
      </p>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <p>{user.website}</p>
      <p>
        {user.address.city} · {user.company.name}
      </p>
      <button type="button" onClick={() => dispatch(clearSelection())}>
        Clear selection
      </button>
    </section>
  )
}
