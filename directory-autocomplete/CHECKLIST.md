# Directory + Autocomplete — Live Coding Checklist

Combines **user-directory** + **autocomplete** in one app.

Speak in **English**. Time target: **45–60 min**.

API: `https://jsonplaceholder.typicode.com/users` (fetch once, filter client-side)

---

## Before coding

> I'll fetch users once, debounce the search input, use that debounced query for both an autocomplete dropdown and the directory list, then add city filter and sort.

---

## Build order

### 1. Fetch + loading/error (directory)
- [ ] `users`, `loading`, `error`
- [ ] `useEffect` + `fetch`

### 2. Controlled search (autocomplete)
- [ ] `query` state + input

### 3. Debounce
- [ ] `useDebounce(query, 300)`
- [ ] **Say:** "Debounced value drives filtering so we don't work on every keystroke."

### 4. Derived filtered list (shared)
- [ ] Filter by name/username/email + city
- [ ] Sort copy with `.slice().sort`
- [ ] **Say:** "One filtered array feeds the dropdown and the list — no duplicated state."

### 5. Autocomplete dropdown
- [ ] `isOpen`, top 5 suggestions
- [ ] Click → `selected`, fill input, close dropdown
- [ ] Optional: click outside to close

### 6. Directory list + UserCard
- [ ] Render `filteredUsers`
- [ ] Highlight if `selected?.id === user.id`

### 7. City + sort controls
- [ ] Same as user-directory

---

## Interview angle

> "This merges two classic exercises: directory filtering and autocomplete UX. Fetch once for a small dataset; debounce the query; derive results once; reuse them in the dropdown and the list."

If the API were huge:

> "I'd switch to server search on the debounced query and abort in-flight requests."

---

## Practice

1. Build fetch + debounce + shared filter first.
2. Add dropdown, then city/sort.
3. Explain why filtered users are not in `useState`.
