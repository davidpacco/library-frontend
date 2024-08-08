import { Authors } from "./components/Authors";
import { Books } from "./components/Books";
import { NewBook } from "./components/NewBook";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  const style = {
    marginRight: 10
  }

  return (
    <div>
      <div>
        <span style={style}>
          <Link to="/">Authors</Link>
        </span>
        <span style={style}>
          <Link to="/books">Books</Link>
        </span>
        <span style={style} >
          <Link to="/add">Add book</Link>
        </span>
      </div>

      <br />

      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
      </Routes>
    </div>
  )
}

export default App
