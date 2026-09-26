import type { User } from '../types/user'

// English: Typed props keep the contract clear and avoid any.
type UserCardProps = {
  user: User
}

export function UserCard({ user }: UserCardProps) {
  return (
    <article className="user-card">
      <h2>{user.name}</h2>
      <p>@{user.username}</p>
      <p>{user.email}</p>
      <p>{user.address.city}</p>
      <p>{user.company.name}</p>
    </article>
  )
}
