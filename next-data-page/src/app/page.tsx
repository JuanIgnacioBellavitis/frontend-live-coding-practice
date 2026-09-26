import { UserPicker } from "../components/UserPicker"
import type { User } from "../types/user"
import styles from "./page.module.css"

const USERS_URL = "https://jsonplaceholder.typicode.com/users"

// What for: Server Component (default in App Router) — fetch runs on the server,
//          no useEffect needed, HTML can include data on first response.
async function getUsers(): Promise<User[]> {
  const response = await fetch(USERS_URL, {
    // What for: demo caching option — in interviews, mention you can tune revalidate.
    next: { revalidate: 60 },
  })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json()
}

export default async function HomePage() {
  const users = await getUsers()

  return (
    <main className={styles.main}>
      <h1>Next.js data page</h1>
      <p className={styles.note}>
        This page is a Server Component. UserPicker is a Client Component island.
      </p>
      <UserPicker users={users} />
    </main>
  )
}
