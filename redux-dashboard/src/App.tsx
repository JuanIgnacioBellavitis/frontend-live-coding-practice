import { useEffect } from 'react'
import { UserDetail } from './components/UserDetail'
import { UserList } from './components/UserList'
import { useAppDispatch } from './store/hooks'
import { fetchUsers } from './store/usersSlice'
import './App.css'

function App() {
  const dispatch = useAppDispatch()

  // What for: load users once on mount into the shared Redux store.
  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <main className="app">
      <h1>Redux user dashboard</h1>
      <p className="subtitle">
        UserList and UserDetail both read the same Redux store.
      </p>

      <div className="layout">
        <UserList />
        <UserDetail />
      </div>
    </main>
  )
}

export default App
