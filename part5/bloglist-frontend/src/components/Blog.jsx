import { useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    const updatedBlog = {
      user: blog.user ? blog.user.id : null,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    updateLikes(blog.id, updatedBlog)
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  const showRemoveButton = user && blog.user && (blog.user.username === user.username || blog.user === user.id)

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button onClick={handleLike}>like</button></div>
          <div>{blog.user ? blog.user.name : ''}</div>
          {showRemoveButton && <button onClick={handleRemove}>remove</button>}
        </div>
      )}
    </div>
  )
}

export default Blog
