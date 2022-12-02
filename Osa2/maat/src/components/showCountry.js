import React from 'react'

const Country = (props) => {
    const languages = props.country.languages
        return(
            <div>
                <h1>{props.country.name.common}</h1>
                capital {props.country.capital}
                <br/>
                area {props.country.area}
                <br/>
                <h3>languages: </h3>
                <ul>
                    {Object.keys(languages).map(language => 
                        <li key={languages[language]}>{languages[language]}</li>
                    )}
                </ul>
                <img src={props.country.flags.png} alt="flag" />
            </div>
        )
}


export default Country;