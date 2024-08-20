import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ME } from "../queries"

export function Recommended() {
  const meResult = useQuery(ME)
  const genre = meResult.data?.me.favoriteGenre
  const booksResult = useQuery(ALL_BOOKS, {
    variables: { genre },
  })

  if (meResult.loading || booksResult.loading) {
    return <p>Loading...</p>
  }

  const books = booksResult.data.allBooks

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
          {books.map(b => (
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