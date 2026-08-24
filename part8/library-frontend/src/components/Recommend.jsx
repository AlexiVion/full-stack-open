import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = (props) => {
  const userResult = useQuery(ME)
  const booksResult = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (userResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  const user = userResult.data?.me
  const favoriteGenre = user?.favoriteGenre
  const books = booksResult.data?.allBooks || []

  const recommendedBooks = favoriteGenre
    ? books.filter(b => b.genres.includes(favoriteGenre))
    : []

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{favoriteGenre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendedBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name || a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
