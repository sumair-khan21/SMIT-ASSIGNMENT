// import { createSlice,nanoid } from '@reduxjs/toolkit'

import { createSlice, nanoid } from "@reduxjs/toolkit";


// const initialState = { todo: [
//     {
//     id: 1,
//     title: "redux tool kit"
// }

// ] }

// const todoSlice = createSlice({
//   name: 'todo',
//   initialState,
//   reducers: {
//     addTodo: (state, action) =>{
//       const todo = {
//         id: nanoid(),
//         title: action.payload.title,
//       }
//       state.todo.push(todo)
//       console.log("Add todo", action.payload);
      
//     },
//     deleteTodo: (state, action)=>{
//         // action.payload is expected to be the id of the todo to remove
//         state.todo = state.todo.filter((t) => t.id !== action.payload)
//     },
//     editTodo: (state, action) => {
//       // action.payload should be { id, title }
//       const { id, title } = action.payload
//       const existing = state.todo.find((t) => t.id === id)
//       if (existing) {
//         existing.title = title
//       }
//     },
    
//   },
// })
// export const { addTodo, deleteTodo, editTodo } = todoSlice.actions
// export default todoSlice.reducer


const initialState = { todo: [
  {
    id: 1,
    title: 'redux tool kit'
  }
] }

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state,action) =>{
     const todo = {
      id: nanoid(),
      title: action.payload.title
     } 
     state.todo.push(todo)
     console.log("Add todo", action.payload.title);
    },
    deleteTodo: (state, action)=>{
        state.todo = state.todo.filter((t)=> t.id !== action.payload)
    },
    editTodo: (state, action)=>{
      const {id, title} = action.payload
      const existingTodo = state.todo.find(item => item.id === id)
      if(existingTodo){
        existingTodo.title = title;
      }

    }
  }
})

export const { addTodo, editTodo, deleteTodo } = todoSlice.actions
export default todoSlice.reducer