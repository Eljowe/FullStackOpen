import React from 'react'
import { useState } from 'react'


const Blog = ({ blog, update, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const like = (blog) => {
    const blogObj = { ...blog, likes: blog.likes + 1 }
    update(blogObj, blog.id)
  }

  const style = {
    border: "solid",
    margin: '5px',
    padding: '5px'
  }

  const toggle = () => {
    setVisible(!visible)
  }

  return(
  <div style={style}>
    {visible === false ?
    <div>
      {blog.title} {blog.author}
    </div>
    :
    <div>
      {blog.title} {blog.author} <br/>
      {blog.url} <br/>
      {blog.likes} likes <button id='likebutton' onClick={() => like(blog)}>like</button><br />
      {blog.user.username} <br/>
      <button id='deletebutton' onClick={() => deleteBlog(blog.id)}>delete</button>
    </div>
    }
    <button onClick={toggle} type="submit">view</button>
  </div>  
  )
}

export default Blog