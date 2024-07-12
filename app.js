import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    axios.get('/api/todos').then(response => {
      setTodos(response.data);
    });
  }, []);

  const addTodo = () => {
    axios.post('/api/todos', { text: newTodo }).then(response => {
      setTodos([...todos, response.data]);
      setNewTodo('');
    });
  };

  const toggleTodo = id => {
    const todo = todos.find(t => t._id === id);
    axios.put(`/api/todos/${id}`, { completed: !todo.completed }).then(response => {
      setTodos(todos.map(t => t._id === id ? response.data : t));
    });
  };

  const deleteTodo = id => {
    axios.delete(`/api/todos/${id}`).then(() => {
      setTodos(todos.filter(t => t._id !== id));
    });
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => toggleTodo(todo._id)}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
