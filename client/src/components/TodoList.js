import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = ({ token }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('https://todo-app-backend-j4xg.onrender.com/todos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTodos(response.data);
      } catch (error) {
        console.error('Fetch todos error:', error);
      }
    };
    fetchTodos();
  }, [token]);

  const addTodo = async () => {
    try {
      const response = await axios.post('https://todo-app-backend-j4xg.onrender.com/todos', { title: newTodo }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Add todo error:', error);
    }
  };

  const updateTodo = async (id, completed) => {
    try {
      const response = await axios.put(`https://todo-app-backend-j4xg.onrender.com/todos/${id}`, { completed: !completed }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
    } catch (error) {
      console.error('Update todo error:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://todo-app-backend-j4xg.onrender.com/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Delete todo error:', error);
    }
  };

  return (
    <div>
      <h2>To-Do List</h2>
      <input
        type="text"
        placeholder="New To-Do"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => updateTodo(todo._id, todo.completed)}
            />
            {todo.title}
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
