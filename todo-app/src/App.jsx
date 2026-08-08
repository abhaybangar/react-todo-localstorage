import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const addTodo = () => {
    if (input.trim() === '') return

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: input,
        completed: false
      }
    ])

    setInput('')
  }

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id)

    setTodos(newTodos)
  }

  const completeTodo = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        }
      }

      return todo
    })

    setTodos(newTodos)
  }

  return (
    <>
      <h1>Todos</h1>

      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter your todo"
      />

      <button onClick={addTodo}>Add</button>

      <p>Track your tasks here.</p>

      <p>Total todos: {todos.length}</p>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}

            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => completeTodo(todo.id)}
            />

            <button onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
