import { useState } from 'react'
import AddPerson from "./components/PersonController.js";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [Filter, setFilter] = useState('')

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
      <div>filter shown with <input value={Filter} onChange={handleFilterChange} /></div>
      <h1>add a new</h1>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
          <br/>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <div>debug: {Filter}</div>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => 
           <li key={person.name}> {person.name} - {person.number} </li>
        )}
      </ul>
    </div>
  );
}

export default App;
