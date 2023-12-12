import { useState, useEffect } from 'react'
import './components/Filter.jsx'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import { create, update } from './components/Persons.jsx'
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

    // 同じ名前の場合、電話番号を変更するかどうかを確認する
    const isSameName = persons.some(person => person.name === newName)
    if (!isSameName) {
      create(personObject)
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      return
    }
    const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
    if (isSameName && result) {
      const person = persons.find(person => person.name === newName)
      changeNumber(person.id)
      return
    } else if (isSameName && !result) {
      return
    }
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

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    const result = window.confirm(`Delete ${person.name} ?`)
    if (result) {
      axios
      .delete(`http://localhost:3001/persons/${id}`)
      .then(response => {
        console.log(response)
      })
    }
    setPersons(persons.filter(person => person.id !== id))
  }

  // 名前がすでに存在する人の電話番号を変更する関数
  const changeNumber = (id) => {
    const person = persons.find(person => person.id === id)
    const changedPerson = {...person, number: newNumber}
    update(
      id,
      changedPerson
    ).then(returnedPerson => {
      setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
    })
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
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App