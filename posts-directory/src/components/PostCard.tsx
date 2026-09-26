import type { Post } from '../types/posts'
import { USERS_LIST } from '../helper/user_list'

type PostCardProps = {
  post: Post
  selected?: boolean
  onSelect?: (post: Post) => void 
}

export function PostCard({ post, selected = false, onSelect }: PostCardProps) {
  const user = USERS_LIST.find((user) => user.userId === post.userId)

  return (
    <article className={selected ? 'post-card selected' : 'post-card'} onClick={() => onSelect?.(post)}>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>User: {user?.username}</p>
      <p>Post Id: {post.id}</p>
    </article>
  )
}
