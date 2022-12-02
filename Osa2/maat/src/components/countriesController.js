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
        for (let language in props.countriesToShow[0].languages){
            console.log(language)
        }
        return(
            <div>
                <h1>{props.countriesToShow[0].name.common}</h1>
                <ul>
                    
                </ul>
            </div>
        )
    }
}

export default Countries