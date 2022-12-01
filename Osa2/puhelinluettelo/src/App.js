import { useState, useEffect } from 'react'
import AddPerson from "./components/PersonController.js";
import ShowPersons from "./components/PersonsController.js";
import FilterForm from "./components/FilterController.js";
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [Filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    if (persons.filter(person => person.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      event.preventDefault()
    } else {
      event.preventDefault()
      const personObject = {
        name: newName,
        number: newNumber,
      }
    
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const personsToShow = Filter.length < 1
    ? persons
    : persons.filter(person => person.name.toUpperCase().includes(Filter.toUpperCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm
        Filter={Filter}
        handleFilterChange={handleFilterChange}
      />
      <h2>add a new</h2>
      <AddPerson 
          newName={newName} 
          newNumber={newNumber} 
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
          addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <ShowPersons
          personsToShow={personsToShow}
      />
      <div>debug: Filter:{Filter} name:{newName} number:{newNumber}</div>
      
    </div>
  );
}

export default App;
