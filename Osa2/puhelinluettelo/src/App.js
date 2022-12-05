import { useState, useEffect } from 'react'
import AddPerson from "./components/PersonController.js";
import ShowPersons from "./components/PersonsController.js";
import FilterForm from "./components/FilterController.js";
import axios from 'axios'
import DB from "./services/DB"

const App = () => {
  const [persons, setPersons] = useState([]) 
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

  const deletePerson = (name, id) => {
    return () => {
      if (window.confirm(`Delete ${name}?`)) {
        DB.deletePerson(id)
        .then(()=>{
          setPersons(persons.filter(person => person.id !==id));
          setNewName('');
          setNewNumber('');
        })
      }
    };
  };

  useEffect(() => {
    DB.listPersons().then(response => {
      setPersons(response);
    });
  }, []);


  const addPerson = (event) => {
    event.preventDefault()
    if (persons.filter(person => person.name === newName).length > 0) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const thisPerson = persons.find(p => p.name === newName);
        
        DB.update(thisPerson.id, {...thisPerson, number: newNumber})
        .then(updatedPerson => {
          setPersons(
            persons.map(person => (person.name === newName ? updatedPerson : person))
          );
        })
        setNewName('')
        setNewNumber('')
      } else {
        setNewName('')
        setNewNumber('')
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
    
      axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
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
          deletePerson={deletePerson}
      />
      <div>debug:
          Filter: {Filter} <br/>
          name: {newName} <br/>
          number: {newNumber}</div>
      
    </div>
  );
}

export default App;
