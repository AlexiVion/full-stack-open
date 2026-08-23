const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  const blogs = [
    { _id: '1', title: 'Blog 1', author: 'Author 1', url: 'http://example.com/1', likes: 2, __v: 0 },
    { _id: '2', title: 'Blog 2', author: 'Author 2', url: 'http://example.com/2', likes: 7, __v: 0 },
    { _id: '3', title: 'Blog 3', author: 'Author 3', url: 'http://example.com/3', likes: 12, __v: 0 }
  ]

  test('of empty list is zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 5)
  })

  test('of a bigger list is calculated correctly', () => {
    assert.strictEqual(listHelper.totalLikes(blogs), 21)
  })
})

describe('favorite blog', () => {
  const blogs = [
    { title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', likes: 12 },
    { title: 'First Blog', author: 'Author A', likes: 5 },
    { title: 'Most Liked Blog', author: 'Author B', likes: 17 }
  ]

  test('finds the blog with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, {
      title: 'Most Liked Blog',
      author: 'Author B',
      likes: 17
    })
  })
})

describe('most blogs', () => {
  const blogs = [
    { title: 'Blog 1', author: 'Robert C. Martin', likes: 2 },
    { title: 'Blog 2', author: 'Edsger W. Dijkstra', likes: 5 },
    { title: 'Blog 3', author: 'Robert C. Martin', likes: 10 },
    { title: 'Blog 4', author: 'Robert C. Martin', likes: 0 }
  ]

  test('finds author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, {
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})
