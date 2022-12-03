import React, {useState} from 'react'
import Country from './showCountry'

const Countries = (props) => {
    if (props.countriesToShow.length>11) {
        return(
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    if (props.showCountry !== undefined) {
        return(
            <Country country={props.showCountry}/>
        )

    } else if (1<props.countriesToShow.length && props.countriesToShow.length<11) { 
        return(
            <div>
                <ul>
                    {props.countriesToShow.map(country =>
                    
                    <li key={country.name.common}>
                        {country.name.common}
                        <form>
                            <button type="submit" onClick={props.showThisCountry} value={country.name.common} >show</button>
                        </form>
                    </li>
                        )}
                </ul>
            </div>
        )
    } else if (props.countriesToShow.length === 1) {
        const country = props.countriesToShow[0]
        return(
            <Country country={country}/>
        )
    }
}

export default Countries