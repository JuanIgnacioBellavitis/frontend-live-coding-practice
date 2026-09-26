# Sortable Table — Live Coding Checklist

Use this while practicing. Speak in **English**. Build **one step at a time** — add state only when that step needs it.

Time target:
- **45–60 min** → steps 1–7 (fetch, table, sort, pagination)
- **+10–15 min if time left** → step 8 (search filter)

API: `https://jsonplaceholder.typicode.com/users`

---

## Before coding (20–30 seconds)

> I'll fetch users into a table, then add column sorting and client-side pagination. If we have time, I'll add a search filter. Sorted and paginated rows will be derived — I won't store them in extra state.

---

## Step-by-step build order

### 1. Static table shell
- [ ] `<table>` with headers: Name, Email, City, Company
- [ ] **Say:** "I'll sketch the table first, then load the data."

### 2. TypeScript types
- [ ] `User` with nested `address.city` and `company.name`
- [ ] `SortKey` and `SortDirection` unions
- [ ] **Say:** "Small types for the columns we actually sort and render."

### 3. Fetch on mount
- [ ] `users`, `loading`, `error`
- [ ] `useEffect` + native `fetch` + `response.ok`
- [ ] **Say:** "Same fetch pattern: loading, success, error. Side effect in `useEffect`."

### 4. Render rows
- [ ] Map `users` into `<tr>`
- [ ] `key={user.id}`
- [ ] **Say:** "Stable ids as keys — important once we sort and paginate."

### 5. Sort by column
- [ ] `sortKey` + `sortDirection` state
- [ ] Header buttons call `handleSort(key)`
- [ ] Same column → flip asc/desc; new column → asc
- [ ] Derive `sortedUsers` with `[...users].sort(...)` — **copy first**
- [ ] Helper `getSortValue(user, key)` for nested fields
- [ ] Show ↑ / ↓ on the active column
- [ ] **Say:** "`.sort()` mutates, so I copy the array. Sort result is derived, not stored in state."

### 6. Pagination
- [ ] `page` state + `PAGE_SIZE` constant (e.g. 5)
- [ ] `totalPages = ceil(length / PAGE_SIZE)`
- [ ] `pageUsers = sortedUsers.slice(start, start + PAGE_SIZE)`
- [ ] Previous / Next with `disabled` on edges
- [ ] **Say:** "Pagination is a slice of the already-sorted list — still derived data."

### 7. Reset page on sort
- [ ] When sort changes, `setPage(1)`
- [ ] Clamp page if needed (`Math.min(page, totalPages)`)
- [ ] **Say:** "After sorting I reset to page 1 so the user isn't left on an empty page."

### 8. Search filter (only if time left — ~10 min)
- [ ] `search` state + controlled input
- [ ] Derive `filteredUsers` **before** sort
- [ ] Pipeline: `users → filter → sort → slice`
- [ ] Reset `page` to 1 when search changes
- [ ] Empty row: `No users found`
- [ ] **Say:** "One text filter is enough for live coding. Multiple dropdown filters I'd mention, not build, unless asked."

---

## Interview timing advice

| Time left | Do this |
|-----------|---------|
| Core 45–60 min | Fetch + table + sort + pagination |
| +10 min | One search input across columns |
| Don't start | City select + company select + date ranges — say it out loud instead |

Good line if time is short:

> "I'd add a search filter next — filter first, then sort, then paginate. Multiple facet filters would follow the same derived pipeline."

---

## If still more time

- [ ] Page size `<select>` (5 / 10)
- [ ] Server-side sort/filter/pagination — query params
- [ ] `useMemo` — "with 10 rows no; with thousands maybe"
- [ ] Debounce search — only if searching hits an API

---

## Data pipeline (say this out loud)

```text
users (state from API)
  → filteredUsers (derived: search)
  → sortedUsers   (derived: copy + sort)
  → pageUsers     (derived: slice)
  → render
```

Do **not** put `filteredUsers`, `sortedUsers`, or `pageUsers` in `useState`.

---

## Quick answers (memorize)

| Question | Short answer |
|----------|----------------|
| Why copy before `sort`? | `.sort()` mutates the original array. |
| Why not store sorted rows in state? | Derived from `users` + sort settings. |
| Filter → sort → paginate order? | Yes — filter all, sort all, then slice. |
| Sort then paginate, or paginate then sort? | **Sort all, then slice** — otherwise order is wrong across pages. |
| When server-side pagination? | Large datasets; API returns one page + total count. |
| Index as `key`? | No — sort/pagination reorder rows; use `id`. |
| Multiple filters in 60 min? | Prefer one search; mention facets as next step. |

---

## Practice modes

1. **No timer** — fetch → table → sort → pagination → search.
2. **60 min** — core only (1–7); search only if finished early.
3. **45 min** — same; practice saying the filter line without coding it.
4. **Order drill** — intentionally paginate *before* sort once, explain why it's wrong, then fix.
