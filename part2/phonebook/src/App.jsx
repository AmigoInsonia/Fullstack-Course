import { useState } from 'react'

import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'} 
  ])
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName
    }

    let addName = true
    for (var key in persons) {
      console.log("name is ", persons[key].name)
      if(newName.toUpperCase() === persons[key].name.toUpperCase()) {
        alert(`${newName} is already added to phonebook`)
        addName = false
        break
      }
    }

    if (addName) {
      setPersons(persons.concat(nameObject))
    }
      setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <div>
          {persons.map(person =>
            <Person key={person.name} person={person} />
          )}
        </div>
    </div>
  )
}

export default App
