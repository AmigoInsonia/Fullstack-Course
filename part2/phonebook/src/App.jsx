import { useState, useEffect } from 'react'

import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()

    if (newName.trim() === '') {
      alert('Name cannot be empty!')
      return
    }

    const personObject = {
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
      personService
        .create(personObject)
        .then(returnedPerson => {
          //console.log(response)
          setPersons(persons.concat(returnedPerson))
        })
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
