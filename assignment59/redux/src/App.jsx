// slice just ek best practice hay yehi naame se rakhenge
// or reducer ye hy k sari functionality reduceers k ander ayegi
// useDispatech agr client side se data bhejna ho toh dispatch 
// useSelectior store se data chahite ho toh 
// redux agr srif plain js ki app k sath chalega
// react redux react app k sath chalega state management krti hay
// slice k ander name pas krte hain ye convention hy
//state means initailState milegi
// jb bhi data bhejge toh action

// Action kya hota hai?

// Action ek event hota hai jo Redux ko batata hai ke kya karna hai.

// For example:

// user ne button click kiya

// data add karna hai

// koi value update karni hai

// Action basically ek signal hota hai ke state me change lana hai.

// 💡 Payload kya hota hai?

// Payload action ke saath bheja gaya data hota hai.

// For example:

// user ka naam

// number

// product ka object

// koi value jo update karni ho

// Matlab:
// “action bataata hai kya karna hai, aur payload bataata hai ke kis cheez ke saath karna hai





// ⭐ State kis kaam ata hai?
// 1️⃣ App ka data store karna

// Har wo cheez jo tum app ke andar dikhana ya use karna chahte ho, wo sab state me hoti hai.

// Examples:

// counter ki value

// user ka naam

// login status

// product list

// theme (dark/light)

// 2️⃣ UI ko update karna

// Jab bhi state change hoti hai, React automatically UI ko dobara render karta hai.
// Iska matlab: tumhain manually kuch update karne ki zarurat nahi hoti.

// Example:

// counter value badli → screen par new value dikh jayegi

// user login hua → UI change ho jayega

// 3️⃣ App ka data central jagah se control karna (Redux ka fayda)

// Redux me state centralized hota hai, matlab:

// ek jagah data store

// har component use kar sakta hai

// har component update kar sakta hai (through actions)

// 🔥 Example samajhne ke liye (Roman Urdu + Code)
// const counterSlice = createSlice({
//   name: 'counter',
//   initialState: { value: 0 }, // <-- YEH STATE HAI
//   reducers: {
//     increase: (state, action) => {
//       state.value += action.payload; 
//     }
//   }
// });

// Roman Urdu Explanation:

// initialState me jo { value: 0 } diya hai, yeh state hai

// isme counter ki current value hoti hai

// jab hum reducer call karte hain, yehi state update hoti hai












// import React, { useState } from 'react'
// import {useDispatch}  from 'react-redux'
// import { addTodo } from './Features/todoSlice'

// const App = () => {
//   const [inputs, setinputs] = useState("")
//   const dispatch = useDispatch()

//   const handleTodo = ()=>{
//     // dispatch addTodo with an object containing title (matches reducer payload)
//     dispatch(addTodo({ title: inputs }))
//   }

//   return (
//     <div>

//   <input type="text" onChange={(e)=> setinputs(e.target.value)} value={inputs} />
//       <button onClick={handleTodo}>Add todo</button>
//     </div>
//   )
// }

// export default App




import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, deleteTodo, editTodo } from './Features/todoSlice'
import { Plus, Trash2, Edit2, Check, X, ListTodo } from 'lucide-react'

const App = () => {
  const [input, setinput] = useState("")
  const [editingId, seteditingId] = useState(null)
  const [editingText, seteditingText] = useState("")
  const dispatch = useDispatch()
  const todos = useSelector((a)=> a.todo.todo)

  const handleEdit = (todo)=>{
    seteditingId(todo.id)
    seteditingText(todo.title)
  }

  const handleUpdate = () =>{
    if(editingText.trim()){
      dispatch(editTodo({id: editingId, title: editingText}))
      seteditingId(null)
      seteditingText("")
    }
  }

  const handleDelete = (id) =>{
    dispatch(deleteTodo(id))
  }
  
  const handleTodo = ()=>{
    if(input.trim()){
      dispatch(addTodo({title: input}))
      setinput("")
    }
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      handleTodo()
    }
  }

  const handleEditKeyPress = (e) => {
    if(e.key === 'Enter'){
      handleUpdate()
    }
    if(e.key === 'Escape'){
      seteditingId(null)
      seteditingText("")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3">
            <ListTodo className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
          </div>
          <p className="text-gray-500 mt-2 ml-11">Manage your daily tasks efficiently</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex gap-3">
            <input 
              type="text" 
              value={input} 
              onChange={(e)=> setinput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-gray-900 placeholder-gray-400"
            />
            <button 
              onClick={handleTodo}
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Task
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-600 font-medium">
            {todos.length === 0 ? 'No tasks' : `${todos.length} ${todos.length === 1 ? 'Task' : 'Tasks'}`}
          </p>
          {todos.length > 0 && (
            <p className="text-sm text-gray-500">Keep up the good work!</p>
          )}
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {  todos.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-16 text-center">
              <ListTodo className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No tasks yet</h3>
              <p className="text-gray-500">Add your first task to get started</p>
            </div>
          ) : (
            todos.map((item)=>(
              <div 
                key={item.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow"
              >
                {
                  editingId === item.id ? (
                    <div className="flex gap-3 items-center">
                      <input 
                        type="text" 
                        value={editingText} 
                        onChange={(e)=> seteditingText(e.target.value)}
                        onKeyPress={handleEditKeyPress}
                        className="flex-1 px-4 py-2.5 border border-indigo-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-gray-900"
                        autoFocus
                      />
                      <button 
                        onClick={handleUpdate}
                        className="p-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        title="Save"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={()=> seteditingId(null)}
                        className="p-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
                        title="Cancel"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-4">
                      <p className="flex-1 text-gray-900 font-medium break-words">
                        {item.title}
                      </p>
                      <div className="flex gap-2">
                        <button 
                          onClick={()=> handleEdit(item)}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          title="Edit task"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={()=> handleDelete(item.id)}
                          className="p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-gray-400"
                          title="Delete task"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )
                }
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App