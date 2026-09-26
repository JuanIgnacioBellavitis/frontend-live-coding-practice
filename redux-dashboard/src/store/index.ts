import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './usersSlice'

// What for: single Redux store — both UserList and UserDetail read from here.
export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
