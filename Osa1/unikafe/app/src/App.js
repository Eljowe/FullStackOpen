import { useState } from 'react'

const StatisticLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  return(
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
        <StatisticLine text="good" value ={props.goodvalue} />
        <StatisticLine text="neutral" value ={props.neutralvalue} />
        <StatisticLine text="bad" value ={props.badvalue} />
        <StatisticLine text="all" value ={props.goodvalue+props.neutralvalue+props.badvalue} />
        <StatisticLine text="average" value ={(props.goodvalue+props.neutralvalue+props.badvalue)/3} />
        <StatisticLine text="positive" value ={((props.goodvalue)/(props.goodvalue+props.neutralvalue+props.badvalue))*100} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [goodvalue, setgoodValue] = useState(0)
  const [neutralvalue, setneutralValue] = useState(0)
  const [badvalue, setbadValue] = useState(0)

  if (goodvalue+neutralvalue+badvalue == 0) {
    return (
      <div>
        <h1>give feedback</h1>
        <Button handleClick={() => setgoodValue(goodvalue+1)} text="good" />
        <Button handleClick={() => setneutralValue(neutralvalue+1)} text="neutral" />
        <Button handleClick={() => setbadValue(badvalue+1)} text="bad" />
        <br/>
        No feedback given
      </div>
    )
  } else {
    return (
      <div>
        <h1>give feedback</h1>
        <Button handleClick={() => setgoodValue(goodvalue+1)} text="good" />
        <Button handleClick={() => setneutralValue(neutralvalue+1)} text="neutral" />
        <Button handleClick={() => setbadValue(badvalue+1)} text="bad" />
        <br/>
        <Statistics goodvalue={goodvalue} badvalue={badvalue} neutralvalue={neutralvalue} />
      </div>
    )
  }
}

export default App