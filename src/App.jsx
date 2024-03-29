import { useEffect, useState } from 'react'
import { TodoProvider } from './context/TodoContext'
import Todoform from './components/Todoform'
import TodoItems from './components/TodoItems'

function App() {
  const [todos, setTodos] = useState([])
  const addTodo = (todomsg) =>{
    setTodos((prev)=>[{id:Date.now(),...todomsg},...prev])
  }
  const updateTodo = (id,todomsg) =>{
    setTodos((prev)=>prev.map((prevtodo)=>(prevtodo.id === id ? (todomsg) : (prevtodo) )))
  }
  const deleteTodo = (id) =>{
     setTodos((prev)=>prev.filter((prevtodo)=> (prevtodo.id !== id )))
  }
  const toggle = (id) =>{
    setTodos((prev)=>prev.map((prevtodo)=>(prevtodo.id === id ?{...prevtodo,completed: !prevtodo.completed}:(prevtodo))))
  }

  //local storage to set & extract data 
  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem('todos'))
    if(todos && todos.length > 0){
        setTodos(todos)
    }
    },[])
 useEffect(()=>{
  localStorage.setItem("todos" , JSON.stringify(todos))
 },[todos])

  return (
   
   <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggle}}>
     <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <Todoform />
                 
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todomsg) => (
                          <div key={todomsg.id}
                          className='w-full'
                          >
                            <TodoItems todo={todomsg} />
                          </div>
                        ))}
                       
                    </div>
                </div>
            </div>
   </TodoProvider>
  )
}

export default App
