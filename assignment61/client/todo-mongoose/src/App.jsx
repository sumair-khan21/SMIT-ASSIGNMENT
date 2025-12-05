import React, { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const App = () => {
  const [todoToEdit, setTodoToEdit] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl translate-y-1/2"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-12 sm:py-20">
        <header className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
              Task Master
            </span>
          </h1>
          <p className="text-slate-400 text-lg">
            Stay organized, focused, and get things done.
          </p>
        </header>

        <main>
          <TodoForm todoToEdit={todoToEdit} setTodoToEdit={setTodoToEdit} />
          
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-200">Your Tasks</h2>
              <div className="h-px flex-1 bg-slate-800 ml-6"></div>
            </div>
            <TodoList onEdit={setTodoToEdit} />
          </div>
        </main>

        <footer className="mt-20 text-center text-slate-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Task Master. Built with RTK Query & Tailwind.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;