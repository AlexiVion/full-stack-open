import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { v4 as uuid } from 'uuid'

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-1807-11e9-a152-16e23967017a",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa51ab1-1807-11e9-a152-16e23967017a",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa51ab2-1807-11e9-a152-16e23967017a",
    born: 1821
  },
  {
    name: 'Joshua Kerievsky',
    id: "afa51ab3-1807-11e9-a152-16e23967017a",
  },
  {
    name: 'Sandi Metz',
    id: "afa51ab4-1807-11e9-a152-16e23967017a",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f0-1807-11e9-a152-16e23967017a",
    genres: ['refactoring']
  },
  {
    title: 'Agile Software Development, Principles, Patterns, and Practices',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f1-1807-11e9-a152-16e23967017a",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5b6f2-1807-11e9-a152-16e23967017a",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to Patterns',
    published: 2004,
    author: 'Joshua Kerievsky',
    id: "afa5b6f3-1807-11e9-a152-16e23967017a",
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design in Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5b6f4-1807-11e9-a152-16e23967017a",
    genres: ['ruby', 'design']
  },
  {
    title: 'Crime and Punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5b6f5-1807-11e9-a152-16e23967017a",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5b6f6-1807-11e9-a152-16e23967017a",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = `
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      let filteredBooks = books
      if (args.author) {
        filteredBooks = filteredBooks.filter(b => b.author === args.author)
      }
      if (args.genre) {
        filteredBooks = filteredBooks.filter(b => b.genres.includes(args.genre))
      }
      return filteredBooks
    },
    allAuthors: () => {
      return authors.map(a => ({
        ...a,
        bookCount: books.filter(b => b.author === a.name).length
      }))
    }
  },
  Mutation: {
    addBook: (root, args) => {
      if (!authors.find(a => a.name === args.author)) {
        authors = authors.concat({ name: args.author, id: uuid() })
      }
      const book = { ...args, id: uuid() }
      books = books.concat(book)
      return book
    },
    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)
      if (!author) {
        return null
      }
      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      return updatedAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
})

console.log(`Server ready at ${url}`)
