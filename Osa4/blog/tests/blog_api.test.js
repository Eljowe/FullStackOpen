const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  })

describe('Test backend', () => {
    test('blogs are returned as json', async () => {
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('blogs have id in correct format', async () => {
        const res = await api.get('/api/blogs')
        res.body.forEach(element => {
            expect(element.id).toBeDefined()
        });
    })
    test('blogs can be added', async () => {
        const testBlog = {
            title: 'Test',
            author: 'Test Author',
            url: 'Test.com',
            likes: 300
        }
        await api.post('/api/blogs')
        .send(testBlog)
        .expect(201)

        const res = await api.get('/api/blogs')
        const blogs = res.body.map(blog => blog.author)
        expect(blogs).toContain(testBlog.author)
    })
    test('blogs length increases when new blog is added', async () => {
        const testBlog = {
            title: 'Test',
            author: 'Test Author',
            url: 'Test.com',
            likes: 300
        }
        await api.post('/api/blogs')
        .send(testBlog)
        .expect(201)

        const res = await api.get('/api/blogs')
        const len = res.body.length
        expect(len).toBe(3)
    });
    test('if likes are not defined, the default is 0', async () => {
        const testBlog = {
            title: 'Test',
            author: 'Test Author',
            url: 'Test.com'
        }
        await api.post('/api/blogs')
        .send(testBlog)
        .expect(201)

        const res = await api.get('/api/blogs')
        const addedBlog = res.body[2]
        expect(addedBlog.likes).toBe(0)
    });
    test('if no title and url, status code 400', async () => {
        const testBlog = {
            author: 'Test Author',
            likes: 3
        }
        await api.post('/api/blogs')
        .send(testBlog)
        .expect(400)
    });
})

describe('Test DELETE request', () => {
    test('blogs can be deleted', async () => {
        const reslen = await api.get('/api/blogs')
        const len = reslen.body.length

        const res = await api.get('/api/blogs')
        const blogs = res.body[0]
        await api.delete(`/api/blogs/${blogs.id}`)
        const reslen2 = await api.get('/api/blogs')
        const len2 = reslen2.body.length
        expect(len2).toEqual(len-1)
    })
})

afterAll(() => {
    mongoose.connection.close()
})