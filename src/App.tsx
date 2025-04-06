import './App.css'
import { useState, useEffect } from 'react'

interface Todo {
  description: string
}

const loadFromLocalStorage = (): Todo[] => {
  const data = localStorage.getItem('todos')
  return data ? JSON.parse(data) : []
}

const saveToLocalStorage = (todos: Todo[]) => {
  localStorage.setItem('todos', JSON.stringify(todos))
}

function App() {
  const [todoDescription, setTodoDescription] = useState('')
  const [todoList, setTodoList] = useState<Todo[]>([])

  // Cargar datos al iniciar
  useEffect(() => {
    const storedTodos = loadFromLocalStorage()
    setTodoList(storedTodos)
  }, [])

  const handleChange = (e: any) => {
    setTodoDescription(e.target.value)
  }

  const handleClick = () => {
    if (todoDescription.trim() === '') return

    const newTodo: Todo = { description: todoDescription }
    const updatedList = [newTodo, ...todoList]
    setTodoList(updatedList)
    saveToLocalStorage(updatedList)
    setTodoDescription('')
  }

  return (
    <div style={{ border: '1px solid red', padding: 10 }}>
      <div>
        <input
          type='text'
          value={todoDescription}
          onChange={handleChange}
          style={{ marginRight: 10 }}
        />
        <button onClick={handleClick}>Add Item</button>
      </div>

      <div>TODOs Here:</div>
      <ul>
        {todoList.map((todo, index) => (
          <li key={index}>
            <input type='checkbox' />
            {todo.description}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App

