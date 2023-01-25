import { useSelector, useDispatch } from 'react-redux'
import reducer from './reducers/anecdoteReducer'
import NewAnecdote from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const anecdotes = useSelector(state => state)

  return (
    <div>
      <AnecdoteList anecdotes={anecdotes}/>
      <h2>create new</h2>
      <NewAnecdote/>
    </div>
  )
}

export default App