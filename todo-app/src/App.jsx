import { useState, useEffect } from 'react'
import './App.css'

function App() {
 
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos')

    return savedTodos ? JSON.parse(savedTodos) : []
  })

  const [input, setInput] = useState('')

  
  const [editTodoId, setEditTodoId] = useState(null)
  const [editInput, setEditInput] = useState('')

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

  
  const editTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id)

    if (todoToEdit) {
      setEditTodoId(id)
      setEditInput(todoToEdit.text)
    }
  }

i
  const saveEdit = () => {
    if (editInput.trim() === '') return

    const newTodos = todos.map((todo) => {
      if (todo.id === editTodoId) {
        return {
          ...todo,
          text: editInput
        }
      }

      return todo
    })

    setTodos(newTodos)
    setEditTodoId(null)
    setEditInput('')
  }


  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <div className="app">

      <h1>Todos</h1>

      {/* Add Todo */}
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter your todo"
        />

        <button onClick={addTodo}>
          Add
        </button>
      </div>

      <p className="description">
        Track your tasks here.
      </p>

      <p className="todo-count">
        Total todos: {todos.length}
      </p>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>

            {editTodoId === todo.id ? (

              // Edit Mode
              <>
                <input
                  type="text"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />

                <button onClick={saveEdit}>
                  Save
                </button>
              </>

            ) : (

            
              <>
                <span className="todo-text">
                  {todo.text}
                </span>

                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => completeTodo(todo.id)}
                />

                <button onClick={() => editTodo(todo.id)}>
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </>

            )}

          </li>
        ))}
      </ul>

    </div>
  )
}

export default App
