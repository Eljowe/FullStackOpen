import { useState } from 'react'
import {
  useNavigate
} from 'react-router-dom'
import  { useField } from '../hooks'

const CreateNew = (props) => {
    const navigate = useNavigate()
    //const [content, setContent] = useState('')
    //const [author, setAuthor] = useState('')
    //const [info, setInfo] = useState('')
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
  
    const handleSubmit = (event) => {
      event.preventDefault()
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
      navigate('/')
    }

    const reset = () => {
      content.reset()
      author.reset()
      info.reset()
    }

    const noReset = (content) => {
      const { reset, ...copy } = content
      return copy
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form>
          <div>
            content
            <input
              {...noReset(content)}
            /> 
          </div>
          <div>
            author
            <input
              {...noReset(author)}
            /> 
          </div>
          <div>
            url for more info
            <input
              {...noReset(info)}
            /> 
          </div>
          <button onClick={handleSubmit}>create</button>
          <button onClick={reset}>reset</button>
        </form>
      </div>
    )
  
  }
export default CreateNew;