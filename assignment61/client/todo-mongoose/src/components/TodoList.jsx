import React from 'react';
import { useGetTodosQuery } from '../services/todoApi';
import TodoItem from './TodoItem';

const TodoList = ({ onEdit }) => {
  const { data: responseData, isLoading, isError, error } = useGetTodosQuery();

  // Handle different response structures (array, {data: []}, {todos: []})
  const todos = Array.isArray(responseData) 
    ? responseData 
    : responseData?.data 
      ? responseData.data 
      : responseData?.todos 
        ? responseData.todos 
        : [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
            <div className="h-4 bg-slate-700 rounded w-3/4 mb-3"></div>
            <div className="h-3 bg-slate-700/50 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-center">
        <p className="text-red-400 font-medium">Error loading tasks</p>
        <p className="text-red-400/60 text-sm mt-1">{error?.message || 'Something went wrong'}</p>
      </div>
    );
  }

  if (!todos || todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-slate-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
          </svg>
        </div>
        <p className="text-slate-400 text-lg">No tasks yet</p>
        <p className="text-slate-500 text-sm mt-1">Add a new task to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id || todo._id} todo={todo} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default TodoList;
