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

  await blog.save()
    .then(savedblog => {
      response.status(201).json(savedblog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter