import React, { useState, useEffect } from 'react';
import { useAddTodoMutation, useUpdateTodoMutation } from '../services/todoApi';

const TodoForm = ({ todoToEdit, setTodoToEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [addTodo, { isLoading: isAdding }] = useAddTodoMutation();
  const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation();

  useEffect(() => {
    if (todoToEdit) {
      setTitle(todoToEdit.title);
      setDescription(todoToEdit.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
  }, [todoToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      if (todoToEdit) {
        await updateTodo({
          ...todoToEdit,
          title,
          description
        }).unwrap();
        setTodoToEdit(null);
      } else {
        await addTodo({
          title,
          description,
          status: 'active'
        }).unwrap();
      }
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error('Failed to save the todo:', err);
    }
  };

  const handleCancel = () => {
    setTodoToEdit(null);
    setTitle('');
    setDescription('');
  };

  const isLoading = isAdding || isUpdating;

  return (
    <form onSubmit={handleSubmit} className="mb-8 bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl border border-slate-700 shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
          {todoToEdit ? 'Update Task' : 'Add New Task'}
        </h2>
        {todoToEdit && (
          <button 
            type="button" 
            onClick={handleCancel}
            className="text-xs text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded-full transition-colors"
          >
            Cancel Edit
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-slate-200 placeholder-slate-500 transition-all duration-200"
          />
        </div>
        <div>
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="2"
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-slate-200 placeholder-slate-500 transition-all duration-200 resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-6 text-white font-semibold rounded-xl shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
            todoToEdit 
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-purple-500/20' 
              : 'bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 shadow-indigo-500/20'
          }`}
        >
          {isLoading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>{todoToEdit ? 'Update Task' : 'Create Task'}</span>
              {todoToEdit ? (
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              )}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
