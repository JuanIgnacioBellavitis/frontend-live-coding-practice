# Autocomplete — Live Coding Checklist

Use this while practicing. Speak in **English**. Build **one step at a time** — add state only when that step needs it.

Time target: **45–60 min** for steps 1–8.

API used in this repo: `https://dummyjson.com/users/search?q=...`

---

## Before coding (20–30 seconds)

> We need an autocomplete: controlled input, debounce so we don't hit the API on every keystroke, show suggestions with loading/empty states, and select one item. I'll start with the input, then debounce, then fetch.

---

## Step-by-step build order

### 1. Controlled input
- [ ] Static title + `<input>`
- [ ] Add `query` state (`value` + `onChange`)
- [ ] **Say:** "First I need a controlled input so React owns the typed value."

### 2. Suggestions UI shell
- [ ] Empty `<ul>` (or placeholder) under the input
- [ ] **Say:** "I'll reserve a list for suggestions, then wire the data."

### 3. Debounce (custom hook)
- [ ] Create `useDebounce(value, delay)` with `setTimeout` + **`clearTimeout` in cleanup**
- [ ] `const debouncedQuery = useDebounce(query, 300)`
- [ ] **Say:** "I debounce so we wait ~300ms after the user stops typing. Cleanup clears the timeout so stale updates don't fire."

### 4. Fetch when debounced query changes
- [ ] `useEffect` depends on `debouncedQuery` (not raw `query`)
- [ ] Skip if `trim().length < 2`
- [ ] Add `suggestions` state
- [ ] Native `fetch` + type the response fields you need
- [ ] **Say:** "The effect listens to the debounced value so we don't spam the API. Fetch is enough here — no Axios needed."

### 5. Loading & error
- [ ] Add `loading` and `error`
- [ ] Check `response.ok`
- [ ] `try / catch / finally`
- [ ] **Say:** "Same pattern as any async UI: loading, success, error."

### 6. Render suggestions
- [ ] Map suggestions; `key={suggestion.id}`
- [ ] Empty state: `No users found`
- [ ] Add `isOpen` (or equivalent) to show/hide the dropdown
- [ ] **Say:** "Stable ids as keys; empty state when the API returns nothing."

### 7. Select an item
- [ ] Add `selected` state
- [ ] On click: set selected, put label into `query`, clear suggestions, close dropdown
- [ ] **Say:** "On select I update the input and close the list."

### 8. Fix: don't search again after select
- [ ] Selecting changes `query` → debounce would fetch again and may show "No users found"
- [ ] Skip that next search with a `useRef` flag (or don't reopen while `selected` is set)
- [ ] On typing again (`onChange`): clear `selected`, allow search
- [ ] **Say:** "After select the query changes, so I skip the next search to avoid reopening an empty dropdown."

### 9. AbortController (bonus / strong mid signal)
- [ ] Pass `signal` to `fetch`
- [ ] `abort()` in effect cleanup
- [ ] Ignore `AbortError` in `catch`
- [ ] **Say:** "If the user keeps typing, I abort the previous request so a slow response doesn't overwrite newer results."

---

## If time left (say it, implement only if asked)

- [ ] Keyboard: ArrowUp / ArrowDown / Enter / Escape
- [ ] Close on outside click
- [ ] Highlight matching text

---

## Quick answers (memorize)

| Question | Short answer |
|----------|----------------|
| Why debounce? | Avoid one request per keystroke; wait until typing pauses. |
| Why `clearTimeout`? | Cleanup — otherwise old timers still update state. |
| Effect on `query` or `debouncedQuery`? | `debouncedQuery` — that's the point of debouncing. |
| Why AbortController? | Cancel in-flight request when query changes or unmounts. |
| Why `useRef` after select? | Skip the search caused by filling the input; refs don't trigger re-renders. |
| Fetch vs Axios? | Fetch is built-in; prefer it in live coding unless the codebase uses Axios. |

---

## Practice modes

1. **No timer** — finish all steps, especially select + skip-next-search.
2. **60 min** — steps 1–8 from scratch, explain out loud in English.
3. **45 min** — same next day; add AbortController if time remains.
4. **Bug drill** — intentionally omit step 8 once, see the "No users found after select" bug, then fix it.
