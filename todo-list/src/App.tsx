import { useState } from 'react'
import { TodoItem } from './components/TodoItem'
import type { Todo, TodoFilter } from './types/todo'
import './App.css'

function App() {
  // What for: the full list of todos (source of truth for add/toggle/delete).
  const [todos, setTodos] = useState<Todo[]>([])
  // What for: controlled input for the new todo text.
  const [text, setText] = useState('')
  // What for: which tab is active — all / active / completed.
  const [filter, setFilter] = useState<TodoFilter>('all')

  function handleAdd(event: React.FormEvent) {
    event.preventDefault()

    const trimmed = text.trim()
    if (!trimmed) {
      return
    }

    // English: Never mutate todos — create a new array with a new item.
    //          crypto.randomUUID() is fine in modern browsers for local ids.
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: trimmed,
      completed: false,
    }

    setTodos((current) => [...current, newTodo])
    setText('')
  }

  function handleToggle(id: string) {
    // English: map returns a new array; copy the changed object ({ ...todo }).
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  function handleDelete(id: string) {
    // English: filter returns a new array without the deleted item.
    setTodos((current) => current.filter((todo) => todo.id !== id))
  }

  // English: Visible list is derived — do NOT store filteredTodos in another useState.
  const visibleTodos = todos.filter((todo) => {
    if (filter === 'active') {
      return !todo.completed
    }
    if (filter === 'completed') {
      return todo.completed
    }
    return true
  })

  const activeCount = todos.filter((todo) => !todo.completed).length

  return (
    <main className="app">
      <h1>Todo list</h1>

      <form onSubmit={handleAdd} className="add-form">
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="What needs to be done?"
          aria-label="New todo"
        />
        <button type="submit">Add</button>
      </form>

      <div className="filters" role="group" aria-label="Filter todos">
        <button
          type="button"
          className={filter === 'all' ? 'active' : undefined}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          type="button"
          className={filter === 'active' ? 'active' : undefined}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          type="button"
          className={filter === 'completed' ? 'active' : undefined}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      {visibleTodos.length === 0 ? (
        <p className="empty">No todos</p>
      ) : (
        <ul className="todo-list">
          {/* English: Use todo.id as key — stable; index keys break on delete/reorder.
          {visibleTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}

      <p className="footer">{activeCount} item(s) left</p>
    </main>
  )
}

export default App
