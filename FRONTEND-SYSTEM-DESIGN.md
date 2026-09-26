# Frontend System Design — Speak-Out-Loud Guide

For Wizeline-style **1h** interviews (talk + optional live coding).  
Practice **out loud in English**. Time each prompt **15–20 min**.

Pair with: `WIZELINE-CHEATSHEET.md` (Redux / Next / RTL / a11y).

---

## 0. Opening (always)

> Before I design anything, I want to clarify requirements and constraints. Then I'll break down the UI, data flow, state, and trade-offs.

Ask 4–6 questions (pick what fits):

1. Who are the users? Internal admin or public?
2. Rough scale — hundreds of rows or hundreds of thousands?
3. Real-time updates needed?
4. Mobile / responsive required?
5. SEO matter, or authenticated app only?
6. Existing stack — Next.js, Redux, design system?

---

## 1. The 5-step framework (memorize)

Say it as a checklist every time:

| Step | What you say |
|------|----------------|
| **1. Clarify** | "Assumptions: … If that's wrong, tell me." |
| **2. UI** | "I'd split into these pages/components: …" |
| **3. Data** | "APIs, loading/error, pagination, caching…" |
| **4. State** | "Local vs URL vs Redux — here's why…" |
| **5. Quality** | "Perf, a11y, tests, monitoring…" |

Close with:

> If we had more time I'd dig into X. Happy to implement a slice of this next.

---

## 2. Default toolbox (your projects → design language)

| Concern | What to propose | Your drill |
|---------|-----------------|------------|
| List + search + sort | Derived filter/sort, stable keys | user-directory, sortable-table |
| Typeahead | Debounce, AbortController | autocomplete |
| Forms | Controlled inputs, pure validate | form-validation |
| Shared selection/filters | Redux Toolkit + selectors | redux-dashboard |
| First paint / SEO | Server Component fetch | next-data-page |
| Tests | RTL user behavior | form-validation tests |
| Docs / variants | Storybook (talk) | cheatsheet |

---

## 3. State decision tree (say this)

> If state is used by one component → `useState`.  
> If it's long / complex transitions → `useReducer`.  
> If it must survive refresh or be shareable via link → URL search params.  
> If many distant screens need the same data → Redux Toolkit or a server-cache library (RTK Query / React Query).  
> I wouldn't put every input into Redux.

---

## 4. Performance lines (keep short)

> With small lists I wouldn't reach for `useMemo`. With thousands of rows I'd paginate or virtualize.  
> Debounce search before hitting the API.  
> Abort in-flight requests when the query changes.  
> Code-split heavy routes. Memoize expensive pure children only when profiling shows a problem.

---

## 5. Accessibility lines

> Semantic elements — `button` not clickable `div`.  
> Labels tied to inputs. Keyboard support for menus/modals.  
> Announce errors with `aria-invalid` / `aria-describedby`.  
> Don't trap focus badly; restore focus when a modal closes.

---

# Practice prompt 1 — User admin dashboard (20 min)

**Prompt:** Design a user admin dashboard: search, filters, table, detail panel.

### Talk track (model answer)

**Clarify**

> Is this internal only? About how many users — hundreds or hundreds of thousands? Do we need deep links to a selected user? Any role-based permissions?

**UI**

> Layout: top bar, filter toolbar, data table, and a detail side panel or a detail route. Components: `UserTable`, `Filters`, `UserDetail`, maybe pagination controls. I'd reuse design-system Button/Input from Storybook if the company has one.

**Data**

> `GET /users?search=&city=&page=&sort=`. Loading and error states on the table. Empty state when filters match nothing. If the API is huge, server-side pagination and sorting. If small, client-side filter → sort → slice like in my sortable-table practice.

**State**

> Search and page belong in the URL so links are shareable. Selected user id can be URL or Redux if a detail panel on the same page is shared with other widgets. Table row UI state stays local. I wouldn't put the entire filtered array in Redux — derive it with selectors.

**Next.js**

> List page can be a Server Component for the first fetch, with client islands for interactive filters. Or fully client if it's behind auth and already SPA-like. Detail can be `/users/[id]` as a server page.

**Quality**

> RTL tests: filter updates results, selecting a row shows detail. a11y: table headers, keyboard row activation. Perf: virtualize only if we render thousands of DOM rows.

**If asked to code next**

> I'd start with fetch + table + search, then sort/pagination, then detail panel.

---

# Practice prompt 2 — Autocomplete at scale (20 min)

**Prompt:** Design an autocomplete that must feel fast with a large catalog.

### Talk track (model answer)

**Clarify**

> Is this product search or user search? Minimum characters before search? Do we need keyboard navigation? Offline?

**UI**

> Input, dropdown list, loading spinner, empty state, optional "selected chip". Highlight matching text if design asks. Accessible listbox pattern if we have time.

**Data**

> Debounce ~300ms. Don't call API under 2 characters. AbortController cancels stale requests. Backend should support prefix search (`?q=`). Optionally cache recent queries in memory. Rate-limit on the client by debouncing; server still must protect itself.

**State**

> `query` local. `debouncedQuery` via hook. `suggestions` / `loading` / `error` local or in a small hook. Selected value might lift to parent form or Redux if many screens share it. After select, skip the next search so we don't reopen an empty dropdown.

**Perf**

> Virtualize the dropdown if hundreds of hits. Prefer server-ranked top N (10–20). Don't download the full catalog to the browser.

**Quality**

> Tests: debounce behavior (fake timers), abort ignored errors, select fills input. a11y: arrow keys, Enter, Escape, `aria-expanded`.

**Bridge to coding**

> This matches my autocomplete drill — I'd implement debounce + fetch + select first, then keyboard.

---

# Practice prompt 3 — Notifications bell (20 min)

**Prompt:** Design an in-app notifications feature (bell icon + panel).

### Talk track (model answer)

**Clarify**

> Real-time required or poll every minute? Per-user unread count? Multi-tab? Mobile?

**UI**

> Bell with badge count, dropdown panel, list items (read/unread), mark all as read, link to full notifications page. Empty and error states.

**Data**

> `GET /notifications?cursor=`. `POST /notifications/read`. Unread count via dedicated endpoint or derived. Real-time: WebSocket/SSE if needed; otherwise polling with backoff. Optimistic mark-as-read; rollback on failure.

**State**

> Unread count and panel open state: count is global → Redux or React Query cache. Panel open is local UI state. Prefer server state library for list caching/refetch; Redux if the rest of the app already uses it heavily.

**Next.js**

> Shell can be client for the bell (always interactive). Initial count could come from a server layout fetch into a client provider.

**Quality**

> a11y: button with `aria-label` including unread count; focus trap in panel optional. Tests: opening panel, marking read updates badge. Perf: don't refetch full history on every click — cache + invalidate.

**Risks to mention**

> Multi-tab sync, notification storms, permission for push (out of scope unless asked).

---

## 6. Mini phrases bank (steal these)

**When stuck**

> I'm going to state an assumption and move forward — please correct me if it's wrong.

**When overbuilding**

> For the MVP I'd keep this simpler: local state and a single fetch. We can extract Redux when a second screen needs the same data.

**When they ask Redux**

> Redux fits shared selected entity and cross-page filters. I wouldn't Redux a single form.

**When they ask Next**

> Server Components for initial data; `"use client"` only for interactive leaves.

**When they ask tests**

> I'd test user-visible behavior with RTL — not implementation details.

**When time is up**

> The core design is clear. Next implementation slice would be the list fetch and filters.

---

## 7. Drill schedule (until interview)

| Day | Drill |
|-----|--------|
| Today | Read this file out loud once (all 3 prompts, no coding) |
| Tomorrow | Prompt 1 + 2 with a timer (20 min each), record yourself if possible |
| Day before | Prompt 3 + rebuild one coding drill (sortable-table or redux-dashboard) in 45 min |
| Interview morning | Skim this + `WIZELINE-CHEATSHEET.md` (10 min) |

---

## 8. What NOT to do in FE system design

- Jump into Kafka / shard DB designs unless they ask backend.
- List 15 buzzwords without a UI breakdown.
- Put all state in Redux "because the JD says Redux".
- Ignore a11y and empty/error states — mid interviews notice that.
