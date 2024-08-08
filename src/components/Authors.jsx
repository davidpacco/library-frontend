import { useQuery, useMutation } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import { useState } from "react"

export function Authors({ show }) {
  const result = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    editAuthor({ variables: { name, born: Number(born) } })

    setName('')
    setBorn('')
  }

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

      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <select onChange={(e) => setName(e.target.value)}>
            {authors.map(a =>
              <option key={a.id} value={a.name}>
                {a.name}
              </option>
            )}
          </select>
        </div>
        <div>
          <label>
            Born
            <input
              type="number"
              value={born}
              onChange={e => setBorn(e.target.value)}
            />
          </label>
        </div>

        <button>Update</button>
      </form>
    </div>
  )
}
