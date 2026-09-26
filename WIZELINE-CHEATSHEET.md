# Wizeline Account Validation — English Cheatsheet (1 page)

For: Frontend Software Engineer (Barcelona – Hybrid) · ~1h interview  
Stack they care about: React, TypeScript, Redux, Next.js, Emotion/Storybook, Jest/RTL, a11y, Figma.

Use short answers. Don’t overbuild in live coding.

---

## Opening (20 seconds)

> First I’ll confirm requirements, then ship the simplest working UI. I’ll use TypeScript, handle loading/error, keep derived data out of state, and call out tests/a11y if we have time.

---

## Redux — when yes / when no

**Say this for a small form or table:**

> I wouldn’t use Redux here. The state is local to this page. I’d introduce Redux (or Zustand) only if multiple distant parts of the app need the same data, or we need a predictable global store for a large product.

**If they push on the JD:**

> I’m comfortable with Redux Toolkit: slices, immutable updates via Immer, and async with createAsyncThunk or RTK Query. For a one-hour exercise I’d still start with useState/useReducer and explain where Redux would plug in.

**Quick map:**
- Local UI (input, modal open) → `useState`
- Complex local transitions → `useReducer`
- Shared app-wide (auth, cart, remote cache) → Redux / RTK Query

---

## Next.js

> For this exercise Vite + client React is enough. In Next.js App Router I’d keep interactive pieces as Client Components with `"use client"`, and fetch on the server when SEO or initial HTML matters. Routing, layouts, and API routes are why I’d pick Next for a real product.

**One-liner if asked App vs Pages:**

> I’d default to App Router today; Pages Router only if the codebase is already on it.

---

## Testing (Jest / React Testing Library)

> I’d test user behavior, not implementation details: render loading, successful data, error, typing in search, submitting the form. With RTL I’d use `getByRole`, `userEvent`, and assert visible text — not internal state.

**Minimum cases to mention:**
1. Shows validation errors on submit  
2. Disables submit while invalid / submitting  
3. Calls submit handler with correct payload  
4. Shows success / error from the API  

---

## Accessibility

> I’d wire labels to inputs, keep keyboard focus order, use buttons for actions, and expose errors with `aria-invalid` / `aria-describedby`. For lists I’d use stable keys and semantic table/list markup.

**Fast wins in live coding:**
- `<label htmlFor=...>` or wrapping label  
- `aria-label` on icon-only buttons  
- Don’t remove focus outlines without a replacement  

---

## Emotion / Storybook / Figma (talk, don’t install)

> Emotion is CSS-in-JS colocated with components — fine for design systems. Storybook I’d use to develop components in isolation. From Figma I’d map spacing, typography, and states (hover/disabled/error) before pixel-perfect CSS.

---

## Legacy / OPIS-style work

> I’m used to reading unfamiliar code first: reproduce the bug, find the owner module, add a small fix with a regression test, avoid big rewrites unless asked. Comfortable collaborating with backend/.NET when the contract is the API.

---

## If time runs out

> This works for the happy path. Next I’d add unit tests, tighten a11y, and extract a custom hook / shared form field component. If state spread across routes, that’s when I’d consider Redux Toolkit.

---

## Questions to ask them (end of call)

1. Is this pair programming on an existing repo or greenfield live coding?  
2. How is the OPIS frontend structured today — Next, CRA, or mixed?  
3. How much Redux vs server state (RTK Query / React Query)?  
4. What does success look like in the first 90 days on the account?
