import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useState, useEffect } from "react"

export function Books() {
  const [books, setBooks] = useState([])
  const [filter, setFilter] = useState('all')
  const [genres, setGenres] = useState([])
  const result = useQuery(ALL_BOOKS)

  const filteredBooks = filter === 'all'
    ? books
    : books.filter(({ genres }) => genres.includes(filter))

  useEffect(() => {
    if (result.data) {
      const books = result.data.allBooks
      setBooks(books)

      const allGenres = books.flatMap(book => book.genres)
      const uniqueGenres = new Set(allGenres)
      setGenres([...uniqueGenres])
    }
  }, [result.data])

  if (result.loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h2>Books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {filteredBooks.map((a) => (
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
        {genres.map(genre => (
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