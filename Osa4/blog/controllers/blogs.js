const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  try{
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = request.user

  
  if (!request.body.likes) {
    request.body.likes = 0
  }

  const blog = new Blog(
		{
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes,
			user: user
		}
	)
  if (!request.body.title && !request.body.url) {
    response.status(400).end()
  } else {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog)
  }
} catch (exception) {
  return response.status(401).json({ error: 'token invalid' })
}

})


blogsRouter.delete('/:id', async (request, response) => {
  try{
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    
    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() === decodedToken.id.toString()) {
      await blog.remove()
      response.status(204).end()
    } else {
      response.status(401).end()
    }
  } catch (exception) {
    return response.status(401).json({ error: 'token invalid' })
  }
})


blogsRouter.put('/:id', async (request, response) => {
  try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      
      if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }
      const body = request.body

      const newblog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
      }

      const updatedBlog = await Blog
        .findByIdAndUpdate(request.params.id, newblog, { new: true })
      response.json(updatedBlog)
  } catch (error) {
    return response.status(401).json({ error: 'something went wrong updating blog object' })
  }
})

module.exports = blogsRouter