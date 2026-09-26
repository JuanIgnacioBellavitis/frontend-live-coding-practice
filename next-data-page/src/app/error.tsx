"use client"

import { useEffect } from "react"
import styles from "./page.module.css"

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

// What for: Client error UI — catches render/fetch errors in this route segment.
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className={styles.main}>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </main>
  )
}
