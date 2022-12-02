import React from 'react'
import Country from './showCountry'

const Countries = (props) => {
    if (1<props.countriesToShow.length && props.countriesToShow.length<11) { 
        return(
            <div>
                <ul>
                    {props.countriesToShow.map(country =>
                    <div>
                        <li key={country.name.common}>{country.name.common}</li>
                        <form>
                            <input type="submit" name="add"/>
                        </form>
                    </div>
                        )}
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
        const country = props.countriesToShow[0]
        return(
            <Country country={country}/>
        )
    }
}

export default Countries