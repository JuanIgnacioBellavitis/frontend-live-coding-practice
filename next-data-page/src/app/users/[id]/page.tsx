import Link from "next/link"
import type { User } from "../../../types/user"
import styles from "../../page.module.css"

type PageProps = {
  params: Promise<{ id: string }>
}

async function getUser(id: string): Promise<User> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
    { next: { revalidate: 60 } },
  )

  if (!response.ok) {
    throw new Error(`User ${id} not found`)
  }

  return response.json()
}

// What for: dynamic route Server Component — /users/[id] fetches one user on the server.
export default async function UserPage({ params }: PageProps) {
  const { id } = await params
  const user = await getUser(id)

  return (
    <main className={styles.main}>
      <p>
        <Link href="/">← Back</Link>
      </p>
      <h1>{user.name}</h1>
      <p>@{user.username}</p>
      <p>{user.email}</p>
      <p>
        {user.address.city} · {user.company.name}
      </p>
    </main>
  )
}
