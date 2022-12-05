import React from 'react'


const ShowPersons = (props) => {
    return (
        <div>
            <ul>
                {props.personsToShow.map(person => 
                <li key={person.name}> {person.name} - {person.number} <button onClick={props.deletePerson(person.name, person.id)}>Delete</button> </li>
                )}
            </ul>
        </div>
    )
}

export default ShowPersons;