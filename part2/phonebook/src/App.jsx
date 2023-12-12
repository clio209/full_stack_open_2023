import { useState, useEffect } from 'react'
import './components/Filter.jsx'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  // personを追加する関数
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }
    // 同じ名前の人がいるかどうかを確認する
    const isSameName = persons.some(person => person.name === newName)
    if (isSameName) {
      alert(newName + 'is already added to phonebook')
      return
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filterNameChange = (event) => {
    setFilterName(event.target.value)
  }

  return (
    <div>
      <h2>
        Phonebook
      </h2>
      <Filter 
        filterName={filterName}
        filterNameChange={filterNameChange} 
      />
      <h2>
        add a new
      </h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons 
        persons={persons} 
        filterName={filterName} 
      />
    </div>
  )
}

export default App