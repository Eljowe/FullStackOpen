import React from 'react'

const Countries = (props) => {
    if (1<props.countriesToShow.length && props.countriesToShow.length<11) { 
        return(
            <div>
                <ul>
                    {props.countriesToShow.map(country =>
                        <li key={country.name.common}>{country.name.common}</li>)}
                </ul>
            </div>
        )
    } else if (props.countriesToShow.length>11) {
        return(
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (props.countriesToShow.length === 1) {
        
        <div>
            <h1>{props.countriesToShow}</h1>
        </div>
    }
}

export default Countries