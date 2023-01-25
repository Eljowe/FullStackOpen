import { useSelector, useDispatch } from 'react-redux'
import { upvote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const sortByKey = key => (a, b) => a[key] < b[key] ? 1 : -1
    const sorted = anecdotes.slice().sort(sortByKey('votes'))
    const vote = async (anecdote) => {
        dispatch(upvote(anecdote))
        dispatch(showNotification(`upvoted ${anecdote.content}`, 5))
    }


    return(
        <div>
            {sorted.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
            </div>
      )}
      </div>
    )
}

export default AnecdoteList;