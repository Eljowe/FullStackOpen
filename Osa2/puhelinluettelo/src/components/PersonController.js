import React from 'react'

const AddPerson = (props) => {
    return (
        <form>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange}/>
          <br/>
          number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
        </div>
        <div>
          <button type="submit" onClick={props.addPerson}>add</button>
        </div>
      </form>
    ) 
}

export default AddPerson