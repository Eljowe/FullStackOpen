import React from 'react'

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
        <Part key={part.id} content={part.name} exercises={part.exercises}/>
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

const Courses = (props) => {
  return (
    <div>
        <Header course={props.course.name} />
        <Content parts={props.course.parts}/>
        <Total  parts={props.course.parts}/>
    </div>
)}

export default Courses;