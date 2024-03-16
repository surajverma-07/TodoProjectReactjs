import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos :[
       {
        id:1,
        todomsg:"message",
        completed:false,
       }
    ],
    addTodo : (todomsg) => {},
    updateTodo : (id,todomsg) => {},
    deleteTodo : (id) => {},
    toggle : (id,) => {},
    
})

export const useTodo = () =>{
    return useContext(TodoContext);
}
export const TodoProvider = TodoContext.Provider