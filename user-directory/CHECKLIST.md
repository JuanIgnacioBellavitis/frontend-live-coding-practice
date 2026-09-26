# User Directory — Live Coding Checklist

Use this while practicing. Speak in **English**. Build **one step at a time** — add state only when that step needs it.

Time target: **45–60 min** for steps 1–8.

---

## Before coding (20–30 seconds)

> First I want to confirm the requirements: fetch users, show loading and error states, then search, filter by city, and sort. I'll start with the simplest working version and improve it if we have time.

---

## Step-by-step build order

### 1. Static UI shell
- [ ] Render a title (`Users`) and an empty list / placeholder
- [ ] **Say:** "I'll start with a simple layout, then wire the data."

### 2. TypeScript type
- [ ] Create a `User` type with the fields you will render
- [ ] **Say:** "I'll type the API response so TypeScript catches mistakes early."

### 3. Fetch on mount
- [ ] Add `users` state (`User[]`)
- [ ] `useEffect` with `[]` → call `fetch` (browser API, not React)
- [ ] **Say:** "Side effects go in `useEffect`, not during render. I'll use native `fetch` — no extra dependency for a simple GET."

### 4. Loading & error
- [ ] Add `loading` and `error` state
- [ ] Check `response.ok` (fetch does not throw on 4xx/5xx)
- [ ] `try / catch / finally`
- [ ] Conditional render: Loading → Error → List
- [ ] **Say:** "I'll keep loading, error, and users in state so the UI can react to each phase."

### 5. Render the list
- [ ] Map `users` to UI
- [ ] Use `user.id` as `key` (not the index)
- [ ] **Say:** "Stable unique keys matter when the list filters or reorders."

### 6. Search (controlled input)
- [ ] Add `search` state + controlled `<input>`
- [ ] Filter by `name`, `username`, `email` (case insensitive)
- [ ] Derive `filteredUsers` — **do not** put filtered results in another `useState`
- [ ] Empty message: `No users found`
- [ ] **Say:** "Filtered users are derived from `users` + `search`. Extra state would duplicate data and can get out of sync."

### 7. Filter by city
- [ ] Add `selectedCity` state + `<select>`
- [ ] Derive `cities` with `map` + `Set` + `sort` (no hardcoding)
- [ ] Apply **search + city** together in the same filter
- [ ] **Say:** "Cities come from the data itself so the dropdown stays in sync with the API."

### 8. Sort
- [ ] Add `sortOrder` state (`name-asc` / `name-desc`)
- [ ] Copy before sort: `.slice().sort(...)` or `[...arr].sort(...)`
- [ ] **Say:** "`.sort()` mutates the array, so I copy first."

### 9. Extract component
- [ ] `<UserCard user={user} />` with typed props
- [ ] **Say:** "I'll extract a presentational component to keep `App` focused on data and filters."

---

## If time left (say it, implement only if asked)

- [ ] Retry button on error (reuse the same fetch function)
- [ ] `AbortController` on unmount
- [ ] `useMemo` only if the list were huge — "with 10 users I wouldn't bother"

---

## Quick answers (memorize)

| Question | Short answer |
|----------|----------------|
| Why not store `filteredUsers` in state? | It's derived; storing it duplicates data. |
| Why `useEffect` for fetch? | Network is a side effect; run after mount. |
| Why copy before `sort`? | `.sort()` mutates in place. |
| Fetch vs Axios? | Fetch is built-in; Axios if the project already uses it or needs interceptors. |
| Index as key? | Bad here — list filters/reorders; use `id`. |
| Redux for this? | No — state is local to this page. |

---

## Practice modes

1. **No timer** — finish all steps, understand each why.
2. **60 min** — steps 1–9 from scratch, explain out loud in English.
3. **45 min** — same, next day, without looking at the solution repo.
