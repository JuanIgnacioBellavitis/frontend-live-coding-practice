import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../types/user'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

// What for: async fetch lived in Redux so any screen can trigger/read the same request state.
export const fetchUsers = createAsyncThunk<User[]>('users/fetchUsers', async () => {
  const response = await fetch(USERS_URL)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return (await response.json()) as User[]
})

type UsersState = {
  // What for: list from the API — shared source of truth across components.
  items: User[]
  // What for: loading flag for the shared fetch.
  loading: boolean
  // What for: shared error message if the fetch fails.
  error: string | null
  // What for: controlled search term used by list filtering.
  search: string
  // What for: which user is selected — list and detail both read this.
  selectedId: number | null
}

const initialState: UsersState = {
  items: [],
  loading: false,
  error: null,
  search: '',
  selectedId: null,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // What for: update the search box value in global state.
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
    },
    // What for: select a user so UserDetail can render it.
    selectUser(state, action: PayloadAction<number>) {
      state.selectedId = action.payload
    },
    // What for: clear selection (e.g. after filtering away the selected user).
    clearSelection(state) {
      state.selectedId = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Something went wrong'
      })
  },
})

export const { setSearch, selectUser, clearSelection } = usersSlice.actions
export default usersSlice.reducer
