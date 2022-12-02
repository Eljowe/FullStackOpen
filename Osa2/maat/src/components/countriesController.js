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
        const languages = props.countriesToShow[0].languages
        console.log(props.countriesToShow[0])
        return(
            <div>
                <h1>{props.countriesToShow[0].name.common}</h1>
                capital {props.countriesToShow[0].capital}
                <br/>
                area {props.countriesToShow[0].area}
                <br/>
                <h3>languages: </h3>
                <ul>
                    {Object.keys(languages).map(language => 
                        <li key={languages[language]}>{languages[language]}</li>
                        )}
                </ul>
                <img src={props.countriesToShow[0].flags.png}/>
            </div>
        )
    }
}

export default Countries