import React, { useEffect, useState } from "react";
import axios from 'axios'
import Countries from "./components/countriesController";


const useCountry = (variable) => {
  const [country, setCountry] = useState()
  const url = 'https://restcountries.com/v3.1/name/'

  useEffect(() => {

    const fetchCountry = async () => {
      try {
        const response = await axios.get(`${url}${variable}?fullText=true`)
        setCountry(response.data[0])
      }
      catch (error) {
        setCountry(null)
        console.log(error.response.status)
      }
    }
    if (variable)
      fetchCountry()
  }, [variable])
  return country
}

const ShowCountry = ({ country }) => {
  console.log(country)
	if (!country) {

		return <div>not found...</div>
	}
	return (
		<div>
			<h3>{country.name.common}</h3>
			<div>capital: {country.capital}</div>
			<div>population: {country.population}</div>

			<img src={country.flags.png} height='230' alt={`${country.name.common} flag` } />
		</div>
	)
}

function App() {
  const [newSearch, setNewSearch] = useState("");
  const [countries, setCountries] = useState([]);

  const [showCountry, setShownCountry] = useState();
  const country = useCountry(newSearch)


  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  const handleSearchChange = event => {
    setNewSearch(event.target.value);
    setShownCountry();
  };

  const countriesToShow = newSearch.length < 1
    ? []
    : countries.filter(country => country.name.common.toUpperCase().includes(newSearch.toUpperCase()))
      
  const showThisCountry = event => {
    event.preventDefault()
    const select = countriesToShow.filter(country =>
      country.name.common.includes(event.target.value)
    );
    setShownCountry(select[0]);
  };

  return(
    <div>
      find countries
      <input value={newSearch} onChange={handleSearchChange}/>
      <ShowCountry country={country} />
    </div>
  )

}

export default App;
