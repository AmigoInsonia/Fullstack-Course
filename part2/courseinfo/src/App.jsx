const Header = (props) => {
  console.log(props.course)
  return <h1>{props.course}</h1>
}

const Total = (props) => {
  return <strong>Number of exercises {props.sumOfExercises}</strong>
}

const Part = (props) => {
  console.log("Part data: ", props)
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

const Content = ({content}) => {
  console.log("Content data: ", content)
  return (
    <div>
      {content.map(content =>
        <Part name={content.name} exercises={content.exercises} key={content.id}/>
      )}
    </div>
  )
}

const Course = ({course}) => {
  console.log(course)
  return(
    <div>
      <Header course={course.name}/>
      <Content content={course.parts}/>
      <Total sumOfExercises={course.parts.reduce(
        (accumulator, currentValue) => accumulator + currentValue.exercises, 0
      )}/>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App