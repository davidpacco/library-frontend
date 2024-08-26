import { useState } from "react"
import { useMutation } from "@apollo/client"
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS, ME } from "../queries"

export function NewBook() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [addBook] = useMutation(ADD_BOOK, {
    update: (cache, response) => {
      const newBook = response.data.addBook
      const newAuthor = response.data.addBook.author

      cache.updateQuery({ query: ALL_BOOKS }, (data) => {
        if (data?.allBooks) {
          return {
            allBooks: data.allBooks.concat(newBook),
          }
        }
      })

      cache.updateQuery({ query: ALL_AUTHORS }, (data) => {
        if (data?.authors) {
          const authorExists = data.allAuthors.find(a => a.name === newAuthor.name)
          if (!authorExists) {
            return {
              allAuthors: data.allAuthors.concat(newAuthor)
            }
          }
        }
      })

      const me = cache.readQuery({ query: ME })?.me

      if (me && newBook.genres.includes(me.favoriteGenre)) {
        cache.updateQuery({ query: ALL_BOOKS, variables: { genre: me.favoriteGenre } }, ({ allBooks }) => {
          return {
            allBooks: allBooks.concat(newBook),
          }
        })
      }
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    await addBook({ variables: { title, author, published: Number(published), genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            Add genre
          </button>
        </div>
        <div>Genres: {genres.join(' | ')}</div>
        <button type="submit">Create book</button>
      </form>
    </div>
  )
}
