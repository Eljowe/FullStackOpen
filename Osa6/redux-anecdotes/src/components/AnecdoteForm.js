import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const NewAnecdote = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.showNotification(`created new anecdote: "${content}"`, 5)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
      filter: state.filter,
  }
}

const mapDispatchToProps = { createAnecdote, showNotification }

const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(NewAnecdote)

export default ConnectedAnecdoteForm