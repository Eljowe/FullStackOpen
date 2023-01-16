import React from 'react'
import { useState } from 'react'
import propTypes from 'prop-types'


const Blog = ({ blog, update, deleteBlog, user }) => {
    const [visible, setVisible] = useState(false)
    const [sameUser, setSameUser] = useState(false)
    const like = (blog) => {
        const blogObj = { ...blog, likes: blog.likes + 1 }
        update(blogObj, blog.id)
    }

    const style = {
        border: 'solid',
        margin: '5px',
        padding: '5px'
    }

    const deleteButtonStyle = {
        color: 'red'
    }

    const toggle = () => {
        setVisible(!visible)
        if (user.username === blog.user.username) {
            setSameUser(true)
        } else {
            setSameUser(false)
        }
    }

    return(
        <div style={style}>
            {visible === false ?
                <div className='defaultview'>
                    {blog.title} {blog.author} <button onClick={toggle} type="submit">view</button>
                </div>
                :
                <div className='togglable'>
                    <div className='authortitle'>
                        {blog.title} {blog.author} <button onClick={toggle} type="submit">hide</button> <br/>
                    </div>
                    <div className='url'>
                        {blog.url} <br/>
                    </div>
                    <div className='likes'>
                        {blog.likes} likes <button id='likebutton' onClick={() => like(blog)}>like</button><br />
                    </div>
                    <div className='username'>
                        {blog.user.username} <br/>
                    </div>
                    {sameUser === true ?
                        <button style={deleteButtonStyle} id='deletebutton' onClick={() => {if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {deleteBlog(blog.id)}}}>delete</button>
                        :
                        <br/>
                    }

                </div>
            }
        </div>
    )
}

Blog.propTypes = {
    update: propTypes.func.isRequired,
    deleteBlog: propTypes.func.isRequired,
}

export default Blog