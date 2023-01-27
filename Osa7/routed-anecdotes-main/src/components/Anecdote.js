import {
    useParams
  } from "react-router-dom"

const Anecdote = ({ anecdotes}) => {
    const id = useParams().id
    const anecdote = anecdotes.find(a => a.id === Number(id))
    const padding = {
      paddingRight: 5,
      margin: '20px 0'
    }
    return (
        <div style={padding}>
            <h2>{anecdote.content} by {anecdote.author}</h2>
            has {anecdote.votes} votes <br/>
            for more info see <a href={anecdote.info}>{anecdote.info}</a>
        </div>
    )
  }

export default Anecdote;