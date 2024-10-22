const Header = (props) => {
  console.log("Header: ", props.course)
  return <h1>{props.course}</h1>
}

const Total = (props) => {
  return <strong>Number of exercises: {props.sumOfExercises}</strong>
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

const Course = (course) => {
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

export default Course