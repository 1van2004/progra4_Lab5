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
  
tempTodoList.push(newTodo)

setTodoList(tempTodoList)
  }

  return (
    <>
    <div style={{border: '1px solid red', padding: 10}}>

<div>
  <input 
  value={todoDescription}
onChange={handleChange}
  style= {{marginRight: 10}}/>
  <button onClick={handleCLick}>Add Item</button>
</div>


<div> TODOs Here:</div>
<div>{ JSON.stringify(todoList) }</div>


    </div>
    </>
  )
}

export default App
