# Live Coding Practice — React + TypeScript User Directory

This exercise is designed to simulate a realistic Frontend / React live coding interview.

The goal is not only to make the application work, but also to practice:
- JavaScript and TypeScript fundamentals
- React state and hooks
- API handling
- Filtering and sorting
- Component design
- Performance thinking
- Testing
- Explaining your thought process in English

---

# Exercise: User Directory

Build a small application in **React + TypeScript** that displays users fetched from a public API.

## API

Use:

```text
https://jsonplaceholder.typicode.com/users
```

Example response:

```ts
{
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  address: {
    city: "Gwenborough"
  },
  company: {
    name: "Romaguera-Crona"
  }
}
```

---

# Part 1 — Basic Fetch

When the component mounts:

- Fetch users from the API.
- Show `Loading...` while the request is in progress.
- Show an error message if the request fails.
- Display users when the request succeeds.
- Create an appropriate `User` type in TypeScript.

The UI can be simple:

```text
Users

[ Search users... ]

Leanne Graham
Sincere@april.biz
Gwenborough

Ervin Howell
Shanna@melissa.tv
Wisokyburgh
```

Do not spend too much time on CSS.

## What this practices

- `useState`
- `useEffect`
- `fetch`
- `async/await`
- error handling
- TypeScript types
- conditional rendering

---

# Part 2 — Search

Add an input that lets the user search by:

- `name`
- `username`
- `email`

The search must be **case insensitive**.

These should behave the same:

```text
john
JOHN
John
```

If there are no results:

```text
No users found
```

## Important

Do **not** store filtered users in another `useState`.

Think about why.

## What this practices

- controlled inputs
- derived state
- `filter`
- `includes`
- `toLowerCase`

---

# Part 3 — Filter by City

Add a `<select>`:

```text
All cities
Gwenborough
Wisokyburgh
McKenziehaven
...
```

Cities must be generated automatically from the users.

Do not hardcode them.

Think about:

```ts
map
Set
spread
sort
```

Example:

```ts
const cities = ...
```

The final list should respect both:

```text
search + city
```

---

# Part 4 — Sorting

Add a sorting control:

```text
Sort by:
[ Name A-Z ]
[ Name Z-A ]
```

Do not mutate the original array.

Be ready to explain the difference between:

```ts
users.sort(...)
```

and:

```ts
[...users].sort(...)
```

## Interviewer question

> Why do you copy the array before sorting it?

---

# Part 5 — Extract a Component

Extract each user into:

```tsx
<UserCard user={user} />
```

Define the props correctly:

```ts
type UserCardProps = {
  ...
}
```

Display:

- name
- username
- email
- city
- company

## What this practices

- component composition
- props
- TypeScript typing
- separation of responsibilities

---

# Part 6 — Performance

Now imagine the API returns **20,000 users** instead of 10.

The interviewer asks:

> Would you change anything?

Think about:

- `useMemo`
- debouncing
- virtualization
- pagination
- server-side filtering

You do not need to implement all of them.

You could implement:

```ts
const filteredUsers = useMemo(...)
```

But be able to explain:

> With ten users I probably wouldn’t use useMemo. With a large dataset, if filtering becomes expensive, then I would consider it.

This is better than using `useMemo` automatically.

---

# Part 7 — Debounce

Bonus challenge.

Instead of filtering immediately after every keystroke:

```text
J
Jo
Joh
John
```

wait around **300 ms** after the user stops typing.

Create a custom hook:

```ts
useDebounce(value, delay)
```

Think about:

```ts
useEffect
setTimeout
clearTimeout
custom hooks
```

## Interviewer question

> Why do we clear the timeout?

---

# Part 8 — Retry

If the fetch fails:

```text
Something went wrong.

[ Try again ]
```

The button should retry the API request.

Think about how to organize:

```ts
fetchUsers()
```

so the same function can be reused.

---

# Part 9 — AbortController

Technical bonus.

Use:

```ts
AbortController
```

to cancel the request if the component unmounts.

Be ready to answer:

> Why would this be useful?

Do not spend too much time here if the other parts are not finished.

---

# Part 10 — Testing

You do not need to write every test during the exercise.

But be ready to explain what you would test.

At minimum:

```text
renders loading state
renders users after fetch
shows an error
search filters users
city filter works
sorting works
empty results message appears
retry calls the API again
```

If using React Testing Library, think in terms of user behavior:

```ts
screen.getByRole(...)
screen.getByText(...)
userEvent.type(...)
```

Avoid testing internal component state directly.

---

# Interviewer Questions

After finishing the exercise, try to answer these without searching.

## React

> Why didn’t you store `filteredUsers` in state?

> What would happen if you did?

> Why did you use `useEffect` for the API call?

> What causes this component to re-render?

> Would `useMemo` help here?

> When would `useCallback` make sense?

> Why are keys important when rendering users?

> Would using the array index as a key be okay here?

---

## JavaScript

> Does `.sort()` mutate the array?

> What is the difference between `map`, `filter` and `reduce`?

> How does `Set` help you generate the list of cities?

> What does `async/await` work on top of?

> What happens when a Promise rejects?

---

## TypeScript

> Why did you create a `User` type?

> Would you use `type` or `interface` here?

> What does `User | null` mean?

> What is an optional property?

> How would you represent:

```ts
loading | success | error
```

with a union type?

---

## Architecture

> If this component becomes very large, how would you split it?

> Would you move the API call into a custom hook?

> Would you use Redux here?

A good answer to the Redux question could be:

> Probably not. The state is local to this page and the application is small. I would introduce global state only if multiple unrelated parts of the application need to share it.

---

# What to Say During the Live Coding

Do not program in silence.

## Before starting

> First, I want to understand the requirements. We need to fetch a list of users, display loading and error states, and then allow the user to search and filter the results.

> I’ll start with the simplest solution and improve it if we have time.

---

## While building the fetch

> First I want to make the API call work and display the data.

> I’m going to keep loading, error and users in state.

---

## While adding search

> I don’t think I need another state variable for the filtered users because this value can be derived from the users and the search term.

---

## While sorting

> Since sort mutates the original array, I’m going to create a copy first.

---

## If something breaks

> Okay, this is not behaving as I expected. Let me check the current values.

> I think I’m making this more complicated than necessary. Let me simplify it.

---

## If you forget syntax

> I don’t remember the exact syntax, but I know the approach. Let me think for a second.

---

## When you finish the basic version

> This works for the basic case. Now I would handle the error and loading states.

---

## If you want to mention production improvements

> If this were production code, I would probably extract this logic into a separate hook or service.

---

# Recommended Practice Plan

## First attempt

No time limit.

Finish the entire exercise and understand every part.

## Second attempt

Start from zero.

Time limit:

```text
60 minutes
```

Try to finish:

```text
fetch
loading/error
render users
search
city filter
sort
component extraction
```

## Third attempt

Do it again the next day.

Time limit:

```text
45 minutes
```

This time, explain what you are doing **only in English**.

Do not look at your previous implementation.

---

# Main Goal

If on the third attempt you can build:

```text
fetch
↓
loading/error
↓
render users
↓
search
↓
filter
↓
sort
↓
component extraction
```

without getting completely blocked, you will be much better prepared for a Frontend live coding interview.

The objective is not perfect code.

The objective is to show that you can:

- understand requirements;
- build a simple working solution;
- explain your decisions;
- debug problems;
- improve the solution step by step;
- communicate clearly while coding.
