import { useState } from 'react'

const StatisticLine = (props) => (
  <div>
    {props.text} {props.value}
  </div>
)

const Statistics = (props) => {
  if(props.good + props.neutral + props.bad == 0) {
    return <p>No feedback given</p>
  } else {
    return (
      <div>
        <StatisticLine text='good' value={props.good}/>
        <StatisticLine text='neutral' value={props.neutral}/>
        <StatisticLine text='bad' value={props.bad}/>
        <StatisticLine text='all' value={props.good+props.neutral+props.bad}/>
        <StatisticLine text='average' value={(props.good-props.bad)/(props.good+props.neutral+props.bad)}/>
        <StatisticLine text='positive' value={((props.good)/(props.good+props.neutral+props.bad)*100) + ' %'}/>
      </div>
    )
  }
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }


  return(
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App