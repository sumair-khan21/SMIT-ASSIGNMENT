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

const App = () => {
  const [input, setinput] = useState("")
  const [editingId, seteditingId] = useState(null)
  const [editingText, seteditingText] = useState("")
  const dispatch = useDispatch()
  const todos = useSelector((a)=> a.todo.todo)
  // console.log(todos);
  const handleEdit = (todo)=>{
    seteditingId(todo.id)
    seteditingText(todo.title)
  }

  const handleUpdate =  () =>{
    dispatch(editTodo({id: editingId, title: editingText}))
    seteditingId(null)
    seteditingText("")
  }

  const handleDelete = (id) =>{
    dispatch(deleteTodo(id))
  }
  

  const handleTodo = ()=>{
      dispatch(addTodo({title: input}))
  }
  return (
    <div>
      <input type="text" value={input} onChange={(e)=> setinput(e.target.value)}/>
      <button onClick={handleTodo}>Add todo</button>
      {/* {
        todos.map((items)=> (
          <div key={items.id}>
            <p>{items.title}</p>
            <p onClick={()=> handleDelete(items.id)}>Delete</p>
            <p onClick={()=> handleEdit(items)}>Edit</p>
          </div>
        ))
      } */}
      {
        todos.map((item)=>(
          <div key={item.id}>
            {
              editingId == item.id ? (
                <>
                <input type="text" value={editingText} onChange={(e)=> seteditingText(e.target.value)}/>
                <button onClick={handleUpdate}>Save</button>
                <button onClick={()=> seteditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                <p>{item.title}</p>
                <button onClick={()=> handleDelete(item.id)}>Delete</button>
                <button onClick={()=> handleEdit(item)}>Edit</button>
                </>
              )
            }

          </div>
        ))
      }
      
    </div>
  )
}

export default App













