import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";
import './App.css';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputs, setInputs] = useState("");
  const [editId, setEditId] = useState(null);

  let fetchTodos = async () => {
    const { data, error } = await supabase
      .from("reactPractice")
      .select()
      .order("id", { ascending: true });
    if (error) {
      alert(error.message);
    } else {
      setTodos(data);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  let handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputs) {
      alert("Please enter a todo");
      return;
    }
    if (editId) {
      const { error } = await supabase
        .from("reactPractice")
        .update({ test: inputs })
        .eq("id", editId);
      if (error) {
        alert(error.message);
      } else {
        setInputs("");
        setEditId(null);
        fetchTodos();
      }
    } else {
      const { error } = await supabase
        .from("reactPractice")
        .insert({ test: inputs });
      if (error) {
        alert(error.message);
      } else {
        setInputs("");
        fetchTodos();
      }
    }
  };

  const handleEdit = (todo) => {
    setEditId(todo.id);
    setInputs(todo.test);
  };

  const handleDelete = async (id) => {
    const response = await supabase.from("reactPractice").delete().eq("id", id);
    if (response.error) {
      alert(response.error.message);
    } else {
      setInputs("");
      setEditId(null);
      fetchTodos();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h1 className="text-3xl font-bold text-center text-teal-600 mb-6">
          ✅ My Todo App
        </h1>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
          <input
            type="text"
            value={inputs}
            onChange={(e) => setInputs(e.target.value)}
            placeholder="Enter todo..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition-all"
          >
            {editId ? "Update" : "Add"}
          </button>
        </form>

        {/* Todo List */}
        <ul className="space-y-3">
          <AnimatePresence>
            {todos.map((todo) => (
              <motion.li
                key={todo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
              >
                <span className="text-gray-700 font-medium">{todo.test}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(todo)}
                    className="px-3 py-1 text-sm rounded bg-teal-100 text-teal-700 hover:bg-teal-200 transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="px-3 py-1 text-sm rounded bg-red-100 text-red-600 hover:bg-red-200 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
};

export default App;
