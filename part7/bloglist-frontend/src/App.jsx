import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import { initializeBlogs, createBlog, likeBlog, commentBlog } from './reducers/blogReducer'
import { initializeUser, loginUser, logoutUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setNotification } from './reducers/notificationReducer'

import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const UserList = ({ users }) => (
  <div>
    <h2>Users</h2>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u.id}>
            <td>
              <Link to={`/users/${u.id}`}>{u.name}</Link>
            </td>
            <td>{u.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const User = ({ user }) => {
  if (!user) return null
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(b => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  )
}

const BlogView = ({ blog, handleLike, handleComment }) => {
  if (!blog) return null

  const onSubmitComment = (e) => {
    e.preventDefault()
    const comment = e.target.comment.value
    e.target.comment.value = ''
    handleComment(blog.id, comment)
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>{blog.likes} likes <button onClick={() => handleLike(blog)}>like</button></div>
      <div>added by {blog.user?.name || 'anonymous'}</div>

      <h3>comments</h3>
      <form onSubmit={onSubmitComment}>
        <input name="comment" />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {(blog.comments || []).map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  )
}

const Navigation = ({ user, handleLogout }) => {
  const style = {
    background: '#e0e0e0',
    padding: 10,
    marginBottom: 10
  }
  return (
    <div style={style}>
      <Link to="/" style={{ paddingRight: 5 }}>blogs</Link>
      <Link to="/users" style={{ paddingRight: 5 }}>users</Link>
      {user.name} logged in <button onClick={handleLogout}>logout</button>
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    try {
      await dispatch(loginUser(username, password))
      dispatch(setNotification('welcome back!', 'info'))
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 'error'))
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch(setNotification('logged out successfully', 'info'))
  }

  const handleCreateBlog = async (blogObject) => {
    try {
      await dispatch(createBlog(blogObject))
      dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 'info'))
    } catch (exception) {
      dispatch(setNotification('error creating blog', 'error'))
    }
  }

  const handleLike = (blog) => {
    dispatch(likeBlog(blog))
  }

  const handleComment = (id, comment) => {
    dispatch(commentBlog(id, comment))
  }

  const userMatch = useMatch('/users/:id')
  const matchedUser = userMatch
    ? users.find(u => u.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const matchedBlog = blogMatch
    ? blogs.find(b => b.id === blogMatch.params.id)
    : null

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input name="username" />
          </div>
          <div>
            password
            <input type="password" name="password" />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <Navigation user={user} handleLogout={handleLogout} />
      <h2>blog app</h2>
      <Notification />

      <Routes>
        <Route path="/" element={
          <div>
            <Togglable buttonLabel="new blog">
              <BlogForm createBlog={handleCreateBlog} />
            </Togglable>
            <div style={{ marginTop: 10 }}>
              {sortedBlogs.map(b => (
                <div key={b.id} style={{ border: '1px solid black', padding: 5, marginBottom: 5 }}>
                  <Link to={`/blogs/${b.id}`}>{b.title} {b.author}</Link>
                </div>
              ))}
            </div>
          </div>
        } />
        <Route path="/users" element={<UserList users={users} />} />
        <Route path="/users/:id" element={<User user={matchedUser} />} />
        <Route path="/blogs/:id" element={<BlogView blog={matchedBlog} handleLike={handleLike} handleComment={handleComment} />} />
      </Routes>
    </div>
  )
}

export default App
