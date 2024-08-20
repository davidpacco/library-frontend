import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useState } from "react"

export function Books() {
  const [filter, setFilter] = useState('all')
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: filter === 'all' ? undefined : filter }
  })

  if (result.loading) {
    return <p>Loading...</p>

  }

  const books = result.data.allBooks
  const genres = [...new Set(books.flatMap(({ genres }) => genres))]
  const title = filter === 'all'
    ? 'Books'
    : `${filter[0].toUpperCase()}${filter.slice(1)} books`

  return (
    <div>
      <h2>{title}</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={() => setFilter('all')}>All genres</button>
        {filter === 'all' && genres.map(genre => (
          <button
            key={genre}
            onClick={() => setFilter(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  )
}