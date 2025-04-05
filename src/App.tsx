import './App.css'
import { useState } from 'react'

interface Todo{
  description: string
}

function App() {

const [todoDescription, setTodoDescription] = useState('')
const [todoList, setTodoList] = useState<Todo[]>([])

const handleChange = (e: any) => {
  setTodoDescription(e.target.value)
}

  const handleCLick = () => {
const tempTodoList = [...todoList]
const newTodo = {
  description: todoDescription
}
  
tempTodoList.unshift(newTodo)

setTodoList(tempTodoList)
  }

  return (
    
    <div style={{border: '1px solid red', padding: 10}}>

     <div>
       <input 
         type='text'
         value={todoDescription}
         onChange={handleChange}
         style= {{marginRight: 10}}/>
        <button onClick={handleCLick}>Add Item</button>
     </div>

     <div> TODOs Here:</div>
     <ul>
       {todoList.map((todo, index) => {
         return <li key={index}>
                 <input type='checkbox' />
                 {todo.description}
             </li>
        })}
     </ul>

   </div>
  )
}

export default App
