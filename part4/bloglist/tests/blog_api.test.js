const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

let token = ''

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('secret', 10)
  const user = new User({ username: 'root', name: 'Superuser', passwordHash })
  await user.save()

  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'root', password: 'secret' })

  token = loginResponse.body.token

  const blogObjects = helper.initialBlogs.map(b => new Blog({ ...b, user: user._id }))
  const promiseArray = blogObjects.map(b => b.save())
  await Promise.all(promiseArray)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('unique identifier property of blogs is named id', async () => {
    const response = await api.get('/api/blogs')
    const blogToCheck = response.body[0]

    assert.notStrictEqual(blogToCheck.id, undefined)
    assert.strictEqual(blogToCheck._id, undefined)
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'Async/await simplifies async code',
      author: 'Robert C. Martin',
      url: 'http://example.com/3',
      likes: 8
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    assert(titles.includes('Async/await simplifies async code'))
  })

  test('fails with 401 if token is missing', async () => {
    const newBlog = {
      title: 'Async/await simplifies async code',
      author: 'Robert C. Martin',
      url: 'http://example.com/3',
      likes: 8
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('defaults likes to 0 if missing', async () => {
    const newBlog = {
      title: 'Blog without likes',
      author: 'Martin Fowler',
      url: 'http://example.com/nolikes'
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)
  })

  test('fails with status code 400 if title is missing', async () => {
    const newBlog = {
      author: 'Martin Fowler',
      url: 'http://example.com/notitle'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('fails with status code 400 if url is missing', async () => {
    const newBlog = {
      title: 'Blog without URL',
      author: 'Martin Fowler'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid and user is creator', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    assert(!titles.includes(blogToDelete.title))
  })
})

describe('updating a blog', () => {
  test('succeeds in updating likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedData = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedData)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, blogToUpdate.likes + 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})
