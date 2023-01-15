import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

    const style = {
        margin: '5px 0px'
    }

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        const blog = { title: title, author: author, url: url, likes: 0 }
        createBlog(blog)

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <>
            <h2> Add a blog </h2>
            <form onSubmit={addBlog}>
                <div>
          Title
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                        id="title"
                    />
                </div>

                <div>
          Author
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                        id="author"
                    />
                </div>

                <div>
          Url
                    <input
                        type="text"
                        value={url}
                        name="Url"
                        onChange={({ target }) => setUrl(target.value)}
                        id="url"
                    />
                </div>
                <div style={style}>
                    <button id="create-id" type="submit">
            create
                    </button>
                </div>
            </form>
        </>
    )
}

export default BlogForm