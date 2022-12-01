import React, { useEffect, useState } from "react";

function App() {
  const [newSearch, setNewSearch] = useState("");
  const [countries, setCountries] = useState([]);

  const handleSearchChange = event => {
    setNewSearch(event.target.value);
  };

  
}

export default App;
