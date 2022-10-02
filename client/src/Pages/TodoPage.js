import React, { useState, useEffect } from 'react'
import AddTodos from '../components/AddTodo'
import AllTodos from '../components/AllTodos'

export default function TodoPage(){

  // This state is to get all todos stored in the backend.
  const [todos, setTodos] = useState([])

  // This state is to add new todo in app
  const [addTodos, setAddTodos] = useState("")

  // This useEffect runs everytime a new todo is added in app to update ui.
  useEffect(() => {
    fetch('/api').then(response => {
      if (response.ok){
        return response.json()
      }
    }).then(data => setTodos(data))
  }, [])
  
  // This is to handle new todo from input buttoon. like getting each keystroke update and adding it to the state.
  function handleFormChange(inputValue){
    setAddTodos(inputValue)
  }

  // This function is to handle submit button to add new todo in backend as well as frontend
  function handleFormSubmit(){
    fetch('/api/create', {
      method: 'POST',
      body: JSON.stringify({
        content: addTodos
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => response.json())
      .then(message =>{
        console.log(message)
        setAddTodos('')
        getLatestTodos()
      })
  }
  //  This function is to automatically refresh page to get latest from backend.
  function getLatestTodos(){
    fetch('/api').then(response => {
      if (response.ok){
        return response.json()
      }
    }).then(data => setTodos(data))
  }
  
  return(
    <div>
      <AddTodos userInput = {addTodos} onFormChange = {handleFormChange} onFormSubmit = {handleFormSubmit}/>
      <AllTodos listOfTodos = {todos} noOfTodos = {todos.length} />
    </div>
  )
}