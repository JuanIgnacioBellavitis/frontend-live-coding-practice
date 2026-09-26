import styles from "./page.module.css"

// What for: shown automatically while the Server Component (page) is loading data.
export default function Loading() {
  return (
    <main className={styles.main}>
      <p>Loading users...</p>
    </main>
  )
}
