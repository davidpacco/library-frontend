import { useState } from "react";
import { Authors } from "./components/Authors";
import { Books } from "./components/Books";
import { LoginForm } from "./components/LoginForm";
import { NewBook } from "./components/NewBook";
import { Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Recommended } from "./components/Recommended";
import { Notification } from "./components/Notification";
import { useSubscription } from "@apollo/client";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";
import { updateCache } from "./utils/helpers";

function App() {
  const [token, setToken] = useState(null)
  const [message, setMessage] = useState(null)
  const navigate = useNavigate()

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const bookAdded = data.data.bookAdded
      notify(`${bookAdded.title} by ${bookAdded.author.name} added`)
      updateCache(client.cache, { query: ALL_BOOKS }, bookAdded)
    }
  })

  useEffect(() => {
    setToken(localStorage.getItem('library-user-token'))
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.removeItem('library-user-token')
    navigate('/login')
  }

  const notify = message => {
    setMessage(message)
    setTimeout(() => setMessage(null), 5000)
  }

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Authors</Link>
          </li>
          <li>
            <Link to="/books">Books</Link>
          </li>
          {token ? (
            <>
              <li>
                <Link to="/add">Add book</Link>
              </li>
              <li>
                <Link to="/recommended">Recommended</Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>

      {message && <Notification message={message} />}

      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/recommended" element={<Recommended />} />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
      </Routes>
    </div>
  )
}

export default App
