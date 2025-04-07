import './App.css'
import { useState, useEffect } from 'react'

interface Todo {
  description: string
  completed: boolean
  completedAt: Date | null
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      
      const newTodo: Todo = {
       description: todoDescription,
       completed: false,
       completedAt: null,
  }
      const updatedList = [newTodo, ...todoList]
      setTodoList(updatedList)
      saveToLocalStorage(updatedList)
    }

    //setTodoDescription('')
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


  const handleCheckboxChange = (index: number) => {
    const updatedList = [...todoList]
    const todo = updatedList[index]

    todo.completed = !todo.completed
    todo.completedAt = todo.completed ? new Date() : null

    updatedList.sort((a, b) => Number(a.completed) - Number(b.completed))
    setTodoList(updatedList)
    saveToLocalStorage(updatedList)
  }


  const formatDate = (date: Date) => {
    return date.toLocaleString('es-CR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
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

      <div style={{ 
        marginTop: 20,
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <span style={{ width: '40%' }}>TODOs</span>
        <span style={{ width: '30%' }}>Completed Date</span>
        <span style={{ width: '30%' }}>Options</span>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todoList.map((todo, index) => (
          <li 
            key={index} 
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 0',
            }}
          >
            {/* Columna: TODO */}
            <div style={{ width: '40%', color: todo.completed ? 'red' : 'gray' }}>
              <input 
                type='checkbox' 
                checked={todo.completed}
                onChange={() => handleCheckboxChange(index)}
                style={{ marginRight: 5 }}
              />
              {todo.description}
            </div>

            {/* Columna: Fecha */}
            <div style={{ width: '30%', fontSize: '0.8rem', color: 'gray',  marginRight: '5%', marginLeft: '5%' }}>
              {todo.completedAt ? formatDate(todo.completedAt) : 'Not completed'}
            </div>

            {/* Columna: Botones */}
            <div style={{ width: '30%'}}>
              <button onClick={() => handleEdit(index)} style={{ marginRight: 5 }}>
                Edit
              </button>
              <button onClick={() => handleDelete(index)} style={{ marginRight: 5 }}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
