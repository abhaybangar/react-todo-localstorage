import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
 const [todos, setTodos] = useState([])
 const [input, setInput] = useState('')
 const handleInputChange = (e) => {
  setInput(e.target.value)
 }
 const addTodo =  () => {
   if (input.trim() === '') return

   setTodos([
    ...todos,
    {
      id: Date.now(),
      text : input
    }
   ])
   setInput('')
 }
 



  return (
    <>
    <div>
      <h1>Todos</h1>
      <input type="text" placeholder='Add a todo' value = {input}
      onChange = {handleInputChange} />
      <button onClick= {addTodo}>Add</button>
      <p>Track your tasks here.
        total todos: {todos.length}
      </p>
      <ul>
        {todos.map((todo) =>
        (
          <li key={todo.id}> {todo.text} </li>
        ))}
      </ul>
    </div>

    </>
  )
}

export default App
