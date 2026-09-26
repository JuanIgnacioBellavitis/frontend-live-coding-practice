import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from './index'

export const selectUsersState = (state: RootState) => state.users

export const selectUsers = (state: RootState) => state.users.items
export const selectUsersLoading = (state: RootState) => state.users.loading
export const selectUsersError = (state: RootState) => state.users.error
export const selectSearch = (state: RootState) => state.users.search
export const selectSelectedId = (state: RootState) => state.users.selectedId

// What for: derived filtered list — do NOT store filtered users in the slice.
export const selectFilteredUsers = createSelector(
  [selectUsers, selectSearch],
  (users, search) => {
    const query = search.toLowerCase().trim()
    if (!query) {
      return users
    }

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query),
    )
  },
)

// What for: selected user object for the detail panel (derived from id + items).
export const selectSelectedUser = createSelector(
  [selectUsers, selectSelectedId],
  (users, selectedId) => users.find((user) => user.id === selectedId) ?? null,
)
