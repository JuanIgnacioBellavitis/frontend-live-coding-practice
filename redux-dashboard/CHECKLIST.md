# Redux Dashboard — Live Coding Checklist

Speak in **English**. Build step by step. Time target: **45–60 min**.

API: `https://jsonplaceholder.typicode.com/users`

---

## Before coding (20–30 seconds)

> I'll put users, loading, error, search, and selectedId in a Redux Toolkit slice. Two components — UserList and UserDetail — will read the same store. Filtered users stay derived via a selector.

---

## Step-by-step

### 1. Install & wire Provider
- [ ] `@reduxjs/toolkit` + `react-redux`
- [ ] `<Provider store={store}>` in `main.tsx`
- [ ] **Say:** "Provider makes the store available to the whole tree."

### 2. `configureStore` + types
- [ ] `RootState`, `AppDispatch`
- [ ] Typed hooks `useAppDispatch` / `useAppSelector`
- [ ] **Say:** "Typed hooks avoid repeating generics in every component."

### 3. `createSlice` for users
- [ ] State: `items`, `loading`, `error`, `search`, `selectedId`
- [ ] Reducers: `setSearch`, `selectUser`, `clearSelection`
- [ ] **Say:** "RTK uses Immer under the hood — I can write mutating syntax safely."

### 4. `createAsyncThunk` fetch
- [ ] `fetchUsers` pending / fulfilled / rejected in `extraReducers`
- [ ] Dispatch once on mount from `App`
- [ ] **Say:** "Thunks keep async logic out of components."

### 5. Selectors
- [ ] Basic selectors for each field
- [ ] `selectFilteredUsers` with `createSelector` (derived — not stored)
- [ ] `selectSelectedUser` from `items` + `selectedId`
- [ ] **Say:** "Filtered and selected user are derived. I don't duplicate them in state."

### 6. `UserList`
- [ ] Search input → `dispatch(setSearch)`
- [ ] Map filtered users → `dispatch(selectUser(id))`
- [ ] Loading / error / empty

### 7. `UserDetail`
- [ ] Reads `selectSelectedUser` only
- [ ] Clear selection button
- [ ] **Say:** "Same store, different view — that's why Redux fits here."

---

## Interview answers

| Question | Short answer |
|----------|----------------|
| Why Redux here? | Selected user + filters shared by multiple components/screens. |
| Why not Redux for a todo on one page? | Local `useState` is enough. |
| Why not store filtered users in the slice? | Derived via selector from `items` + `search`. |
| Thunk vs RTK Query? | Thunk is explicit for interviews; RTK Query for caching/refetch in apps. |
| Why Immer? | RTK lets you write "mutating" updates that stay immutable. |

---

## If they say “move this to Redux”

Walk this path out loud:
1. Identify shared state (`selectedId`, `search`, `users`)
2. Create a slice
3. Replace `useState` with `dispatch` + selectors
4. Keep UI-only state local (e.g. modal open)

---

## Practice modes

1. Build from scratch once with the checklist.
2. **45 min:** recreate without looking.
3. Talk track: explain when you would *not* use Redux (single form, one page).
