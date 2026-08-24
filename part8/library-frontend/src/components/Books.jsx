import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const allGenres = Array.from(new Set(books.flatMap(b => b.genres)))

  const filteredBooks = genre
    ? books.filter(b => b.genres.includes(genre))
    : books

  return (
    <div>
      <h2>books</h2>
      {genre && <div>in genre <strong>{genre}</strong></div>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name || a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {allGenres.map(g => (
          <button key={g} onClick={() => setGenre(g)}>{g}</button>
        ))}
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
