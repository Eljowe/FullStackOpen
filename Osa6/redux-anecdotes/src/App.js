import NewAnecdote from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <Filter />
      <AnecdoteList/>
      <NewAnecdote/>
    </div>
  )
}

export default App