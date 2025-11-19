import { createSlice, nanoid } from "@reduxjs/toolkit";


const initialState = { todos: [
    {
        id: 1,
        title: "Hello Redux",
        completed: false
    }
] }

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action)=>{
                const todo = {
                    id: nanoid(),
                    title: action.payload.title,
                    completed: action.payload.completed
                }
                state.todos.push(todo)
                // console.log("Add todo", action.payload.title);
        },
        deleteTodo: (state, action)=>{
            state.todos = state.todos.filter((item) => item.id !== action.payload)
        },
        editTodo: (state, action)=>{
            const { id, title} = action.payload
            const existingTodo = state.todos.find(item => item.id === id)
            if(existingTodo){
                existingTodo.title = title
            }
        }
    }
})


export const {addTodo, deleteTodo, editTodo} = todoSlice.actions;
export default todoSlice.reducer