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
        const languages = Object.keys(props.countriesToShow[0].languages)
        return(
            <div>
                <h1>{props.countriesToShow[0].name.common}</h1>
                <ul>
                    {languages.map(language => {
                        <li key={language}>{language}</li>})}
                </ul>
            </div>
        )
    }
}

export default Countries