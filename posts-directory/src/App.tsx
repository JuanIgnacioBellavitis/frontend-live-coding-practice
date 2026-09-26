import { useEffect, useState } from 'react'
import './App.css'
import type { Post, SortOrder } from './types/posts'
import { PostCard } from './components/PostCard'
import { useDebounce } from './hooks/useDebounce';
import { USERS_LIST } from './helper/user_list';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [sortOrder, setSortOrder] = useState<SortOrder>('name-asc')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<string>('all')
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(POSTS_URL)
        if (!response.ok) throw new Error(`Status ${response.status}`)
        setPosts(await response.json())
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

    const filteredPosts = posts
      .filter((post) => {
        const q = debouncedQuery.toLowerCase().trim()
        const matchesSearch =
          !q ||
          post.title.toLowerCase().includes(q) ||
          post.body.toLowerCase().includes(q) ||
          (USERS_LIST.find((user) => user.userId === post.userId)
            ?.username.toLowerCase()
            .includes(q) ??
            false)
 
        const matchesUser = selectedUser === 'all' || post.userId === Number(selectedUser)

        return matchesSearch && matchesUser
      })
      .slice()
      .sort((a, b) => {
        if (sortOrder === 'name-asc') {
          return a.title.localeCompare(b.title)
        }
        return b.title.localeCompare(a.title)
      })
    
      const suggestions = filteredPosts.slice(0, 5)

      // What for: shared click handler — set the selected post, sync the search input, close the dropdown.
      function handleSelect(post: Post) {
        setSelectedPost(post)
        setQuery(post.title)
        setIsOpen(false)
      }

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

  return (
    <>
      <main className="app">
        <h1>Posts</h1>

        <div className="search-wrap">
          <label className="search-label">
            <span>Search posts</span>
            <input
              type="text"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setIsOpen(true)
              }}
              onFocus={() => setIsOpen(true)}
              placeholder="Type a title or username"
              autoComplete="off"
              aria-autocomplete="list"
              aria-expanded={isOpen}
            />
          </label>

          {isOpen && debouncedQuery.trim().length >= 1 && (
          <ul className="suggestions" role="listbox">
            {suggestions.length === 0 ? (
              <li className="empty">No posts found</li>
            ) : (
              suggestions.map((post) => (
                <li key={post.id} role="option">
                  <button type="button" onClick={() => handleSelect(post)}>
                    <strong>{post.title}</strong>
                    <span>
                      {post.body}
                    </span>
                  </button>
                </li>
              ))
            )}
          </ul>
        )}
        </div>

        {selectedPost && (
          <div>
            <h3 className="selected-line">
              Selected: {selectedPost.title}
            </h3>
            <p>{selectedPost.body}</p>
            <p>User: {USERS_LIST.find((user) => user.userId === selectedPost.userId)?.username}</p>
            <p>Post Id: {selectedPost.id}</p>
          </div>
          
        )}


        <div className="controls">
          <select
            value={selectedUser}
            onChange={(event) => setSelectedUser(event.target.value)}
            aria-label="Filter by user"
          >
            <option value="all">All Users</option>
            {USERS_LIST.map((user) => (
              <option key={user.userId} value={user.userId}>
                {user.username}
              </option>
            ))}
          </select>

          <select
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value as SortOrder)}
            aria-label="Sort by title"
          >
            <option value="name-asc">Title A-Z</option>
            <option value="name-desc">Title Z-A</option>
          </select>
        </div>

        {filteredPosts.length === 0 ? (
          <p>No posts found</p>
        ) : (
          <ul className="post-list">
          {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} selected={selectedPost?.id === post.id} onSelect={handleSelect} />
            ))}
          </ul>
        )}
      </main>
    </>
  )
}

export default App
