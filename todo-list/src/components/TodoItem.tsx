import type { Todo } from '../types/todo'

// English: Typed props keep the item presentational and reusable.
type TodoItemProps = {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className={todo.completed ? 'todo completed' : 'todo'}>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span>{todo.text}</span>
      </label>
      <button type="button" onClick={() => onDelete(todo.id)} aria-label={`Delete ${todo.text}`}>
        Delete
      </button>
    </li>
  )
}
