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
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

 
  useEffect(() => {
    const storedTodos = loadFromLocalStorage()
    setTodoList(storedTodos)
  }, [])

  const handleChange = (e: any) => {
    setTodoDescription(e.target.value)
  }

  const handleClick = () => {
    if (todoDescription.trim() === '') return

    if (editingIndex !== null) {
      
      const updatedList = [...todoList]
      updatedList[editingIndex].description = todoDescription
      setTodoList(updatedList)
      saveToLocalStorage(updatedList)
      setEditingIndex(null)
    } else {
      
      const newTodo: Todo = { description: todoDescription }
      const updatedList = [newTodo, ...todoList]
      setTodoList(updatedList)
      saveToLocalStorage(updatedList)
    }

    setTodoDescription('')
  }

  const handleDelete = (index: number) => {
    const updatedList = todoList.filter((_, i) => i !== index)
    setTodoList(updatedList)
    saveToLocalStorage(updatedList)
  }

  const handleEdit = (index: number) => {
    setTodoDescription(todoList[index].description)
    setEditingIndex(index)
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
        <button onClick={handleClick}>
          {editingIndex !== null ? 'Update Item' : 'Add Item'}
        </button>
      </div>

      <div style={{ marginTop: 10 }}>TODOs Here:</div>
      <ul>
        {todoList.map((todo, index) => (
          <li key={index} style={{ marginBottom: 5 }}>
            <input type='checkbox' style={{ marginRight: 5 }} />
            {todo.description}
            <button onClick={() => handleEdit(index)} style={{ marginLeft: 10 }}>
              Edit
            </button>
            <button onClick={() => handleDelete(index)} style={{ marginLeft: 5 }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
