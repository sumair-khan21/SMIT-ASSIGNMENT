import React from 'react';
import { useDeleteTodoMutation, useUpdateTodoMutation } from '../services/todoApi';

const TodoItem = ({ todo, onEdit }) => {
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation();

  const handleToggleStatus = () => {
    const newStatus = todo.status === 'active' ? 'completed' : 'active';
    updateTodo({ ...todo, status: newStatus });
  };

  const handleDelete = () => {
    deleteTodo(todo.id || todo._id);
  };

  const isCompleted = todo.status === 'completed';

  return (
    <div className={`group relative p-5 rounded-2xl border transition-all duration-300 ${
      isCompleted 
        ? 'bg-slate-900/30 border-slate-800 opacity-75' 
        : 'bg-slate-800/40 border-slate-700 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10'
    }`}>
      <div className="flex items-start gap-4">
        <button
          onClick={handleToggleStatus}
          className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            isCompleted
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-slate-500 hover:border-indigo-400'
          }`}
        >
          {isCompleted && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        
        <div className="flex-1 min-w-0">
          <h3 className={`text-lg font-semibold truncate transition-colors duration-200 ${
            isCompleted ? 'text-slate-500 line-through' : 'text-slate-200'
          }`}>
            {todo.title}
          </h3>
          {todo.description && (
            <p className={`mt-1 text-sm transition-colors duration-200 ${
              isCompleted ? 'text-slate-600' : 'text-slate-400'
            }`}>
              {todo.description}
            </p>
          )}
          <div className="mt-3 flex items-center gap-2">
             <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                isCompleted 
                ? 'bg-green-500/10 text-green-400' 
                : 'bg-indigo-500/10 text-indigo-400'
             }`}>
                {todo.status}
             </span>
          </div>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(todo)}
            className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-400/10 rounded-lg transition-all duration-200"
            title="Edit task"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </button>
          
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-200"
            title="Delete task"
          >
            {isDeleting ? (
              <span className="w-5 h-5 block border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
