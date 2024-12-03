import { useState, useEffect } from 'react'

import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [operationMessage, setOperationMessage] = useState(null)

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
    let updatePhone = false
    let personId = -1
    for (var key in persons) {
      console.log("name is ", persons[key].name)
      if(newName.toUpperCase() === persons[key].name.toUpperCase()) {
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
          updatePhone = true
          personId = persons[key].id
        }
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
          setOperationMessage(
            `Added ${returnedPerson.name}`
          )
          setTimeout(() => {
            setOperationMessage(null)
          }, 5000)
        })
    }

    if(updatePhone) {
      const person = persons.find(p => p.id === personId)
      const changedPhone = { ...person, number: newNumber}
      personService
        .update(personId, changedPhone)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id === personId ? returnedPerson : person))
          setOperationMessage(
            `Changed ${person.name} phone to ${newNumber}`
          )
          setTimeout(() => {
            setOperationMessage(null)
          }, 5000)
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

  const deletePersonId = (id) => {
    const person = persons.find(p => p.id === id)
    if(window.confirm(`Do you really want to delete ${person.name}?`)) {
      personService
        .destroy(id)
        .then(returnedPerson => {
          setPersons(persons.filter(p => p.id !== id))
          setOperationMessage(
            `Deleted ${person.name} from the phonebook!`
          )
          setTimeout(() => {
            setOperationMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={operationMessage} />
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
            <Person 
              key={person.id} 
              person={person} 
              deletePerson={() => deletePersonId(person.id)}
            />
          )}
        </div>
    </div>
  )
}

export default App
