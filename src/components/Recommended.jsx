import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ME } from "../queries"

export function Recommended() {
  const meResult = useQuery(ME)
  const booksResult = useQuery(ALL_BOOKS)

  if (meResult.loading || booksResult.loading) {
    return <p>Loading...</p>
  }

  const favoriteGenre = meResult.data.me.favoriteGenre
  const books = booksResult.data.allBooks
  const filteredBooks = books.filter(({ genres }) => genres.includes(favoriteGenre))

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books based on your favorite genre</p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map(b => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}