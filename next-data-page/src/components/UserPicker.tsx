"use client"

import { useState } from "react"
import Link from "next/link"
import type { User } from "../types/user"
import styles from "./UserPicker.module.css"

type UserPickerProps = {
  users: User[]
}

// What for: Client Component — needs useState / click handlers (browser interactivity).
//          Data still comes from the Server Component as props.
export function UserPicker({ users }: UserPickerProps) {
  // What for: local UI-only selection — no need for Redux on this page.
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const selected = users.find((user) => user.id === selectedId) ?? null

  return (
    <div className={styles.wrap}>
      <ul className={styles.list}>
        {users.map((user) => (
          <li key={user.id}>
            <button
              type="button"
              className={user.id === selectedId ? styles.active : undefined}
              onClick={() => setSelectedId(user.id)}
            >
              {user.name}
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.detail}>
        {selected ? (
          <>
            <p>
              <strong>{selected.name}</strong> (@{selected.username})
            </p>
            <p>{selected.email}</p>
            <p>
              {selected.address.city} · {selected.company.name}
            </p>
            {/* What for: navigate to a dynamic Server Component route. */}
            <Link href={`/users/${selected.id}`}>Open full page</Link>
          </>
        ) : (
          <p>Select a user</p>
        )}
      </div>
    </div>
  )
}
