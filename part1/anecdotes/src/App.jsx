import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const MostVoted = (props) => (
  <div>
    <p>has {props.votes} votes</p>
    <p>{props.text}</p>
  </div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const [maxValue, setMaxValue] = useState(0)
  const [maxPosition, setMaxPosition] = useState(0)

  console.log("The Array created is ", points)

  const randomAnecdote = () => {
    const maxValue = anecdotes.length 
    const minValue = 0
    const randomValue = Math.floor((Math.random() * (maxValue-minValue)))
    console.log("max value is ", maxValue)
    console.log("random value was ", randomValue)
    setSelected(randomValue)
  }

  const voteAnecdote = () => {
    const copy = [...points]
    copy[selected] += 1
    if( (copy[selected]) > maxValue) {
      setMaxValue(copy[selected])
      setMaxPosition(selected)
    }
    setPoints(copy)
  }



  return (
    <div>
      <h1>Anecdote of the Day</h1>
      {anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <div>
        <Button handleClick={voteAnecdote} text='vote' />
        <Button handleClick={randomAnecdote} text='next anedocte' />
      </div>
      <h1>Anecdote With Most Votes</h1>
        <MostVoted votes={maxValue} text={anecdotes[maxPosition]} />
    </div>
  )
}

export default App