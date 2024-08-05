import { useQuery } from "@apollo/client"
import { ALL_AUTHORS } from "../queries"

export function Authors({ show }) {
  const result = useQuery(ALL_AUTHORS)

  if (!show) {
    return null
  }

  if (result.loading) {
    return <p>Loading...</p>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
