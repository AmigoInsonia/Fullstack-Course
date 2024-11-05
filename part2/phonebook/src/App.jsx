import { useState } from 'react'

import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()

    if (newName.trim() === '') {
      alert('Name cannot be empty!')
      return
    }

    const nameObject = {
      name: newName,
      number: newNumber
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
      setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const filterName = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const personsToShow = persons.filter(person =>
     person.name.toUpperCase().includes(filter.toUpperCase())) 

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterName={filterName}/>
      <h2>add a new</h2>
      <PersonForm 
        addName={addName} 
        newName={newName} 
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
        <div>
          {personsToShow.map(person =>
            <Person key={person.name} person={person} />
          )}
        </div>
    </div>
  )
}

export default App
