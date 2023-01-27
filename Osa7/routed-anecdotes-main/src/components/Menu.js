import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"
import CreateNew from "./CreateNew"
import About from "./About"
import AnecdoteList from "./AnecdoteList"
import Footer from "./Footer"
import Anecdote from "./Anecdote"

const Menu = ({anecdotes, addNew}) => {
    const padding = {
      paddingRight: 5
    }
    return (
      <Router>
      <div>
        <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/create">create new</Link>
        <Link style={padding} to="/about">about</Link>
      </div>

      <Routes>
        <Route path="/create" element={<CreateNew addNew={addNew}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
      </Routes>
      <Footer />
    </Router>
    )
  }

export default Menu;