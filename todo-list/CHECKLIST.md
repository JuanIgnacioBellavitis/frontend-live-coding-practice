# Todo List — Live Coding Checklist

Use this while practicing. Speak in **English**. Build **one step at a time** — add state only when that step needs it.

Time target: **45–60 min** for steps 1–7.

No API required — local state only (common mid live coding).

---

## Before coding (20–30 seconds)

> I'll build a todo list with add, toggle complete, delete, and filters for all / active / completed. State stays local. I'll update arrays immutably and extract a TodoItem component if we have time.

---

## Step-by-step build order

### 1. Static UI shell
- [ ] Title, input, Add button, empty list placeholder
- [ ] **Say:** "I'll start with the layout, then wire the state."

### 2. TypeScript types
- [ ] `Todo` (`id`, `text`, `completed`)
- [ ] `TodoFilter` (`'all' | 'active' | 'completed'`)
- [ ] **Say:** "A small type keeps the model clear for the rest of the exercise."

### 3. Add a todo
- [ ] `todos` state + `text` state (controlled input)
- [ ] Form `onSubmit` → `preventDefault`
- [ ] Ignore empty / whitespace-only text
- [ ] Append with `[...current, newTodo]` — **never** `todos.push(...)`
- [ ] Id: `crypto.randomUUID()` (or `Date.now().toString()` if you forget UUID)
- [ ] Clear the input after add
- [ ] **Say:** "React state must be treated as immutable. I create a new array instead of pushing."

### 4. Render the list
- [ ] Map `todos` to list items
- [ ] `key={todo.id}` (not index)
- [ ] **Say:** "Ids stay stable when we delete or filter; index keys would break."

### 5. Toggle complete
- [ ] Checkbox → `map` + `{ ...todo, completed: !todo.completed }`
- [ ] **Say:** "I copy the changed object so I don't mutate the existing todo."

### 6. Delete
- [ ] `filter` out the id
- [ ] **Say:** "`filter` returns a new array without that item."

### 7. Filter All / Active / Completed
- [ ] `filter` state for the UI control
- [ ] Derive `visibleTodos` — **do not** store filtered list in another `useState`
- [ ] Empty message when nothing matches
- [ ] Optional: "X item(s) left" from `todos` (not only visible)
- [ ] **Say:** "The visible list is derived from `todos` + `filter`, same idea as search in the user directory."

### 8. Extract `TodoItem`
- [ ] Props: `todo`, `onToggle`, `onDelete`
- [ ] **Say:** "Presentational item keeps App focused on state updates."

---

## If time left (say it, implement only if asked)

- [ ] Persist with `localStorage` + `useEffect` (load once, save on `todos` change)
- [ ] Inline edit (double-click → input → blur/Enter to save)
- [ ] Clear completed button
- [ ] Drag and drop reorder (usually too much for 60 min — just mention it)

---

## Quick answers (memorize)

| Question | Short answer |
|----------|----------------|
| Why not `todos.push`? | Mutates state; React may not re-render correctly. |
| Why `map` for toggle? | New array + new object for the changed item. |
| Why not `filteredTodos` in state? | Derived from `todos` + `filter`. |
| Why lift handlers in App? | Single source of truth for the list; children call callbacks. |
| Redux here? | No — local UI state is enough. |
| Where would you put an API later? | `useEffect` / custom hook; keep optimistic updates optional. |

---

## Practice modes

1. **No timer** — finish add / toggle / delete / filter / TodoItem.
2. **60 min** — from scratch, explain immutability out loud in English.
3. **45 min** — same next day; add `localStorage` if time remains.
4. **Immutability drill** — break it once with `.push` / direct mutate, watch the bug, then fix.
