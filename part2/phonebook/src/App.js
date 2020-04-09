import React, { useState, useEffect } from 'react'
import Persons from './components/Persons';
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/Person'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterVal, setFilter] = useState('')

  useEffect(() => {
    personService.getData()
        .then(personList => setPersons(personList))
        .catch(err=> console.log(err))
  },[])

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name === 'name') { setNewName(e.target.value); }
    if (e.target.name === 'number') { setNewNumber(e.target.value); }
    
  }
  
  const addName = (e) => {
    e.preventDefault();

    if (newName === ' '){
      alert("Enter Name")
    }

    else if(newNumber === ' '){
      alert("Enter Number")
    }
    else {
      const nameObj = {
          name: newName,
          number: newNumber
    }
    
    if(persons.some(person => person.name === newName)){
        const obj = persons.find(person => person.name === newName)
        if(obj.number !== newNumber){
          var decision = window.confirm(`${obj.Name} is already added to Phonebook. Replace old number with new Number?`)
          
          if(decision){
          const changedObj = {...obj, number: newNumber}
          personService.updateData(obj.id, changedObj)
          .then(updatedData=> {
          setPersons(persons.map(person => person.id !== obj.id? person: updatedData))
          })
          }
        }
        else if (obj.number === newNumber || newNumber === ' '){
        alert(`${newName} already Exists in PhoneBook`)
        } 
    }
    else {
      personService.addData(nameObj)
      .then(result=>{
        console.log(result)
        setPersons(persons.concat(nameObj))
      })
    }

    setNewName('')
    setNewNumber('')
    setFilter('') 
  }
}

  const deletePerson = (id) => {
       console.log(id)
       personService.deleteData(id)
      .then(setPersons(persons.filter(person=> person.id !== id)))
      .catch(err=>console.log(err))
  }

  const filterData = (e) => {
     setFilter(e.target.value);     
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterVal={filterVal} filterData = {filterData} />
      <h2>Add a new contact</h2>
      <PersonForm newName = {newName} newNumber={newNumber} handleChange ={handleChange} addName={addName} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterVal = {filterVal} deletePerson = {deletePerson}/>
    </div>
  )
}

export default App