import React, { useState, useEffect } from 'react';
import TodoList from '../components/TodoList';

function SharedTodosPage() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data = await response.json();
        const normalized = data.map(item => ({
          id: item.id,
          text: item.title,
          completed: item.completed,
        }));
        setTodos(normalized);
        setError(null);
      } catch (err) {
        setError(err.message);
        setTodos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  if (loading) {
    return <div className="page-container"><p>Loading todos from API...</p></div>;
  }

  if (error) {
    return <div className="page-container"><p>Error: {error}</p></div>;
  }

  return (
    <div className="page-container">
      <h1>API Todos</h1>
      <p style={{ fontSize: '12px', color: '#666' }}>
        Data loaded from JSONPlaceholder API
      </p>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );
}

export default SharedTodosPage;