import React, { useEffect, useState } from "react";
import axios from 'axios'
import Countries from "./components/countriesController";

function App() {
  const [newSearch, setNewSearch] = useState("");
  const [countries, setCountries] = useState([]);

  const [showCountry, setShownCountry] = useState();


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
      <Countries countriesToShow={countriesToShow} showCountry={showCountry} showThisCountry={showThisCountry}/>
    </div>
  )

}

export default App;
