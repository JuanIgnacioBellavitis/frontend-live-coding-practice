# Next.js Data Page — Live Coding Checklist

Speak in **English**. Lean App Router demo. Time target: **30–45 min**.

API: `https://jsonplaceholder.typicode.com/users`

---

## Before coding (20 seconds)

> I'll use the App Router. The page will be a Server Component that fetches users. Interactive bits go in a small Client Component with `"use client"`.

---

## Step-by-step

### 1. App Router page (Server Component)
- [ ] `app/page.tsx` is async by default (no `"use client"`)
- [ ] `await fetch(...)` inside the page or a helper
- [ ] **Say:** "Server Components fetch on the server — no useEffect for the initial data."

### 2. Pass data to a Client island
- [ ] `UserPicker` with `"use client"`
- [ ] Receives `users` as props
- [ ] Local `selectedId` with `useState`
- [ ] **Say:** "I only mark interactive parts as client components."

### 3. `loading.tsx`
- [ ] Sibling of `page.tsx`
- [ ] **Say:** "Next shows this while the server page is waiting on data."

### 4. Dynamic route
- [ ] `app/users/[id]/page.tsx`
- [ ] `params` → fetch one user
- [ ] **Say:** "Dynamic segments are still Server Components unless I add use client."

### 5. `error.tsx` (bonus)
- [ ] Client component with `reset`
- [ ] **Say:** "Route-level error UI for failed fetches/renders."

### 6. Metadata (bonus)
- [ ] `export const metadata` in `layout.tsx` or page
- [ ] **Say:** "Metadata is a Server Component feature for SEO/tabs."

---

## Server vs Client (memorize)

| Need | Where |
|------|--------|
| Initial fetch, SEO, secrets | Server Component |
| `useState`, `onClick`, browser APIs | Client Component (`"use client"`) |
| Shared state across many screens | Maybe Redux/Context in client tree |

**Say:**
> "Default is Server Component. I add `"use client"` only at the leaves that need interactivity."

---

## Interview answers

| Question | Short answer |
|----------|----------------|
| Why not fetch in useEffect here? | Server Component can await fetch on the server. |
| When use client? | Hooks, events, browser-only APIs. |
| Redux in Next? | Possible in client tree; server fetch often replaces initial client fetch. |
| App vs Pages Router? | I'd default to App Router unless the codebase is on Pages. |

---

## Practice modes

1. Recreate page + UserPicker + loading from scratch.
2. Explain server vs client without opening docs.
3. Add `/users/[id]` and walk through params.
