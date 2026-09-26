import type { User } from '../types/user'

type UserCardProps = {
  user: User
  selected?: boolean
}

export function UserCard({ user, selected = false }: UserCardProps) {
  return (
    <article className={selected ? 'user-card selected' : 'user-card'}>
      <h2>{user.name}</h2>
      <p>@{user.username}</p>
      <p>{user.email}</p>
      <p>{user.address.city}</p>
      <p>{user.company.name}</p>
    </article>
  )
}
