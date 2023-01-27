import { createSlice } from "@reduxjs/toolkit"
import { showNotification } from "./notificationReducer"
import anecdoteService from '../services/anecdotes'

/*
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
*/

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      state.push({
        content: action.data,
        votes: 0
      })
    },
    voteAnecdote(state, action) {
      console.log(action.payload)
      const id = action.payload
      const votedAnecdote = state.find(anecdote => anecdote.id === id)
      const updateAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes +1
      }
      showNotification('Hello')
      return state.map(anecdote => anecdote.id !== id ? anecdote : updateAnecdote)
    },
    appendAnecdote(state, action) {
			state.push(action.payload)
		},
		setAnecdotes(state, action) {
			return action.payload
		}
  }
})

export const { addAnecdote, voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
//const initialState = anecdotesAtStart.map(asObject)

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch(setAnecdotes(anecdotes))
	}
}

export const createAnecdote = anecdote => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.createNew(anecdote)
		dispatch(appendAnecdote(newAnecdote))
	}
}

export const updateVote = anecdote => {
	return async dispatch => {
		const updatedAnecdote = await anecdoteService.vote(anecdote)
		dispatch(voteAnecdote(updatedAnecdote.id))
	}
}



/*
const anecdoteReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE': {
      const id = action.data.id
      const votedAnecdote = state.find(anecdote => anecdote.id === id)
      const updateAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes +1
      }
      showNotification('Hello')
      return state.map(anecdote => anecdote.id !== id ? anecdote : updateAnecdote)
      }
    default:
      return state
  }
}


export const createAnecdote = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: asObject(anecdote)
  }
}

export const upvote = (anecdote) => {
  return {
    type: 'VOTE',
    data: anecdote
  }
}
*/

export default anecdoteSlice.reducer;