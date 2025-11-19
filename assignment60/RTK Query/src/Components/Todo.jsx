// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { addTodo, deleteTodo, editTodo } from '../features/TodoSlice'
// import { useAddProductMutation, useGetProductsQuery } from '../services/products'

// const Todo = () => {
//   const dispatch = useDispatch()
//   const [title, settitle] = useState('')
//   const [existingId, setexistingId] = useState(null)
//   const [existingText, setexistingText] = useState('')
//   const allTodo = useSelector((item) => item.todo.todos)

//   const handleAddTodo = () => {
//     if(title.trim()){
//       dispatch(addTodo({title: title}))
//       settitle('')
//     }
//   }

//   const handleEdit = (todo) => {
//     setexistingId(todo.id)
//     setexistingText(todo.title)
//   }

//   const handleUpdate = () => {
//     if(existingText.trim()){
//       dispatch(editTodo({id: existingId, title: existingText}))
//       setexistingId(null)
//       setexistingText('')
//     }
//   }

//   const handleDelete = (id) => {
//     dispatch(deleteTodo(id))
//   }

//   const { data: products, isLoading, error } = useGetProductsQuery()
//   const [addProduct, { isLoading: isAddingProduct, isError: isAddingProductError }] = useAddProductMutation()
  
//   const handleProduct = async () => {
//     const newProduct = {
//         title: title,
//         price: 10,
//         description: 'lorem ipsum set dolor amet',
//         image: 'https://via.placeholder.com/150',
//         category: 'electronics'
//     }
//     if(title.trim()){
//       try {
//         await addProduct(newProduct).unwrap()
//         settitle('')
//         // Product will be automatically refetched due to cache invalidation
//       } catch (err) {
//         console.error('Failed to add product:', err)
//       }
//     }
//   }

//   return (
//     <div className="space-y-8">
//       {/* Add Todo Section */}
//       <div className="relative">
//         <div className="flex gap-2">
//           <div className="relative flex-1">
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => settitle(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && handleProduct()}
//               placeholder="Enter product title..."
//               className="w-full px-5 py-3.5 pr-12 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300 text-gray-700 placeholder-gray-400"
//             />
//             <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//             </svg>
//           </div>
//           <button
//             onClick={handleProduct}
//             disabled={isAddingProduct}
//             className="px-6 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//           >
//             {isAddingProduct ? 'Adding...' : 'Add Product'}
//           </button>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="flex items-center justify-between px-2">
//         <p className="text-sm text-gray-500">
//           {allTodo.length} {allTodo.length === 1 ? 'task' : 'tasks'} total
//         </p>
//       </div>

//       {/* Todo List */}
//       <div className="space-y-3">
//         {allTodo.length === 0 ? (
//           <div className="text-center py-12">
//             <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//             </svg>
//             <p className="text-gray-400 text-lg font-medium">No tasks yet</p>
//             <p className="text-gray-300 text-sm mt-1">Add a task to get started!</p>
//           </div>
//         ) : (
//           allTodo.map((todo, index) => (
//             <div
//               key={todo.id}
//               className="group bg-white border-2 border-gray-100 rounded-xl p-4 hover:border-indigo-200 hover:shadow-md transition-all duration-300 animate-in slide-in-from-top"
//               style={{ animationDelay: `${index * 50}ms` }}
//             >
//               {existingId === todo.id ? (
//                 // Edit Mode
//                 <div className="space-y-3">
//                   <input
//                     type="text"
//                     value={existingText}
//                     onChange={(e) => setexistingText(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && handleUpdate()}
//                     className="w-full px-4 py-2.5 bg-gray-50 border-2 border-indigo-300 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-700"
//                     autoFocus
//                   />
//                   <div className="flex gap-2">
//                     <button
//                       onClick={handleUpdate}
//                       className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg"
//                     >
//                       ✓ Save
//                     </button>
//                     <button
//                       onClick={() => setexistingId(null)}
//                       className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all duration-300"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 // View Mode
//                 <div className="flex items-center justify-between gap-3">
//                   <div className="flex-1 min-w-0">
//                     <p className="text-gray-800 font-medium text-lg truncate">
//                       {todo.title}
//                     </p>
//                   </div>
//                   <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <button
//                       onClick={() => handleEdit(todo)}
//                       className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all duration-300 hover:scale-110"
//                       title="Edit task"
//                     >
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                       </svg>
//                     </button>
//                     <button
//                       onClick={() => handleDelete(todo.id)}
//                       className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-300 hover:scale-110"
//                       title="Delete task"
//                     >
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>

//       {/* Products Section */}
//       <div className="border-t-2 border-gray-200 pt-6">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
//             <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//             </svg>
//             API Products
//           </h2>
//           {products && (
//             <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//               {products.length} items
//             </span>
//           )}
//         </div>

//         {isLoading ? (
//           <div className="text-center py-12">
//             <div className="inline-block w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
//             <p className="text-gray-400 text-lg font-medium">Loading products...</p>
//           </div>
//         ) : error ? (
//           <div className="text-center py-12">
//             <svg className="w-20 h-20 mx-auto text-red-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <p className="text-red-400 text-lg font-medium">Error loading products</p>
//             <p className="text-red-300 text-sm mt-1">{error.message || 'Please try again later'}</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2">
//             {products?.slice(0, 10).map((product) => (
//               <div
//                 key={product.id}
//                 className="group bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 rounded-xl p-4 hover:border-indigo-200 hover:shadow-lg transition-all duration-300"
//               >
//                 <div className="flex gap-3">
//                   <div className="flex-shrink-0">
//                     <img
//                       src={product.image}
//                       alt={product.title}
//                       className="w-16 h-16 object-contain rounded-lg bg-white p-1"
//                     />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1">
//                       {product.title}
//                     </h3>
//                     <div className="flex items-center justify-between">
//                       <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                         ${product.price}
//                       </span>
//                       <div className="flex items-center gap-1 text-yellow-500">
//                         <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
//                           <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
//                         </svg>
//                         <span className="text-xs text-gray-600 font-medium">
//                           {product.rating?.rate || 'N/A'}
//                         </span>
//                       </div>
//                     </div>
//                     <span className="inline-block mt-2 text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
//                       {product.category}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Todo