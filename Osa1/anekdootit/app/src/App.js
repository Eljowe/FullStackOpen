import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const randomIntFromInterval = (min, max) => { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

var score = [0,0,0,0,0,0,0]

const vote = (selected) => {
  score[selected] += 1
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState([0,0,0,0,0,0,0]);
  const [highestvotes, sethighest] = useState(0);
  const max = Math.max(...points);

  const index = points.indexOf(max);
  const vote = (selected) => {
    score[selected] += 1;
  }
  
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]} <br/>
      has {points[selected]} votes <br/>
      <Button handleClick={() => {vote(selected); setPoints([...score]); sethighest(index)}} text='vote'/>
      <Button handleClick={() => setSelected(randomIntFromInterval(0,6))} text='next anecdote'/>
      <h1>Anecdote with the most votes</h1>
      {anecdotes[highestvotes]} <br/>
      has {max} votes <br/>
    </div>
  )
}

export default App
