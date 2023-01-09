const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  if (!request.body.likes) {
    request.body.likes = 0
  }
  const blog = new Blog(request.body)
  if (!request.body.title && !request.body.url) {
    response.status(400).end()
  } else {
    await blog.save()
      .then(savedblog => {
        response.status(201).json(savedblog)
      })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter