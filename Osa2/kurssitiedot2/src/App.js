const Header = (props) => {
  return(<h2>{props.course}</h2>)
}

const Part = (props) => {
  return(
    <p>
        {props.content} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  return(
    <div>
      {props.parts.map(part =>
        <Part  content={part.name} exercises={part.exercises}/>
      )}
    </div>
  )
}

const Total = (props) => {
  const initialValue = 0;
  const sumWithInitial = props.parts.reduce(
    (s, p) => s+p.exercises,
     initialValue
     );
  return(
    <p><b>Number of exercises {sumWithInitial}</b></p>
  )
  }

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
        {courses.map(course =>
        <div>
         <Header course={course.name} />
         <Content parts={course.parts} />
         <Total  parts={course.parts}/>
         </div>
      )}
      </div>
  )

}
  
export default App
