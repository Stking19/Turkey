import { useState, useEffect } from "react";
import axios from "axios";
import "./todo.css"; // Import CSS file

const API_URL = "";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [trashedTodos, setTrashedTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all to-dos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create a to-do
  const createTodo = async () => {
    if (!newTodo) return;
    try {
      const response = await axios.post(API_URL, { title: newTodo });
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete a to-do
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Trash a to-do
  const trashTodo = async (id) => {
    try {
      const response = await axios.put();
      setTrashedTodos([...trashedTodos, response.data]);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Restore a trashed to-do
  const restoreTodo = async (id) => {
    try {
      const response = await axios.put();
      setTodos([...todos, response.data]);
      setTrashedTodos(trashedTodos.filter(todo => todo.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container">
      <div className="todo-app">
        <h1>To-Do List</h1>
        
        {/* Add To-Do */}
        <div className="input-container">
          <input
            type="text"
            placeholder="New to-do..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button onClick={createTodo}>Add</button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}

        {/* To-Do List */}
        {/* <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <span>{todo.title}</span>
              <div className="buttons">
                <button className="trash" onClick={() => trashTodo(todo.id)}>🗑</button>
                <button className="delete" onClick={() => deleteTodo(todo.id)}>❌</button>
              </div>
            </li>
          ))}
        </ul> */}

        {/* Trashed To-Do List */}
        {trashedTodos.length > 0 && (
          <div className="trashed-section">
            <h2>Trashed To-Dos</h2>
            <ul className="trashed-list">
              {trashedTodos.map((todo) => (
                <li key={todo.id} className="trashed-item">
                  <span>{todo.title}</span>
                  <button className="restore" onClick={() => restoreTodo(todo.id)}>♻ Restore</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Todo;