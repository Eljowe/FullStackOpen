import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)
    const sortByKey = key => (a, b) => a[key] < b[key] ? 1 : -1
    const sorted = anecdotes.slice().sort(sortByKey('votes'))
  
    return(
        <div>
            <h2>Anecdotes</h2>
            {sorted.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => dispatch({ data: anecdote, type: 'VOTE'})}>vote</button>
                </div>
            </div>
      )}
      </div>
    )
}

export default AnecdoteList;