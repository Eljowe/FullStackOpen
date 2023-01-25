import { useDispatch } from 'react-redux'

const AnecdoteList = ({anecdotes}) => {
    const dispatch = useDispatch()
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