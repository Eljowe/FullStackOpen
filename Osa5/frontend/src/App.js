import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import LogoutForm from './components/LogoutForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [message, setMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs.sort(likeratio) )
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = async event => {
        event.preventDefault()
        try {
            window.localStorage.removeItem('loggedBlogappUser')
            setUser(null)
        } catch (exception) {
            setErrorMessage('error logging out')
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
        }
    }

    const addBlog = (blogObject) => {
        try {
            blogFormRef.current.toggleVisibility()
            blogService
                .create(blogObject)
                .then(returnedBlog => {
                    setBlogs(blogs.concat(returnedBlog))
                    setMessage(`a new blog ${returnedBlog['title']} by ${returnedBlog['author']} added`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 3000)
                })
        } catch (exception) {
            setErrorMessage('adding blog failed')
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
        }
    }

    const likeratio = (a, b) => b.likes - a.likes

    const update = async (blogObj, id) => {
        try{
            const updatedBlog = await blogService.update(id, blogObj)
            updatedBlog.user = blogObj.user
            const updatedBlogs = [...blogs].map((x) => (x.id !== id ? x : updatedBlog))
            setBlogs(updatedBlogs.sort(likeratio))
        } catch (exception) {
            try {
                window.localStorage.removeItem('loggedBlogappUser')
                setUser(null)
            } catch (exception) {
                setErrorMessage('error logging out')
                setTimeout(() => {
                    setErrorMessage(null)
                }, 3000)
            }
        }
    }

    const deleteBlog = async(blogId) => {
        await blogService.remove(blogId)
        const blogs = await blogService.getAll()
        setBlogs(blogs.sort(likeratio))
    }

    const blogFormRef = useRef()

    return (
        <div>
            <h2 style={{ margin: '0 0 0 5px' }}>blogs</h2>
            <ErrorNotification message={errorMessage}/>
            <Notification message={message} />
            {user === null ?
                <LoginForm
                    handleLogin={handleLogin}
                    setUsername={setUsername}
                    setPassword={setPassword}
                />
                :
                <div>
                    <p style={{ margin: '0 0 0 5px' }}>{user.name} logged in</p>
                    <LogoutForm
                        handleLogout={handleLogout}
                        window={window}
                    />

                    <div style={{ margin: '5px' }}>
                        <Togglable buttonLabel="new blog" ref={blogFormRef}>
                            <BlogForm createBlog={addBlog} />
                        </Togglable>
                    </div>
                    {blogs.map(blog =>
                        <Blog
                            key={blog.id}
                            blog={blog}
                            user={user}
                            update={update}
                            deleteBlog={deleteBlog} />
                    )}
                </div>

            }
        </div>
    )
}

export default App
