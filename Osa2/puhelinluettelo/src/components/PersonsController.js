import React from 'react'


const ShowPersons = (props) => {
    return (
        <div>
            <h2>Numbers</h2>
            <ul>
                {props.personsToShow.map(person => 
                <li key={person.name}> {person.name} - {person.number} </li>
                )}
            </ul>
        </div>
    )
}

export default ShowPersons;