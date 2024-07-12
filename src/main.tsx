import React, { useState, useEffect } from 'react';
import { addTodo, getTodos, updateTodo, deleteTodo, updateTodoCompletion } from './firebaseUtils';

interface Task {
  id: string;
  text: string;
  userId: string;
  completed: boolean;  // Ensure the Task interface includes the completed property
}

const Main: React.FC = () => {
  const [todos, setTodos] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState('');
  const [userId, setUserId] = useState('defaultUser'); // Replace with actual user ID logic

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const fetchedTodos = await getTodos(userId);
      setTodos(fetchedTodos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleAddTask = async () => {
    if (taskInput.trim() !== '') {
      try {
        const newTodoId = await addTodo(taskInput, userId);
        setTodos([...todos, { id: newTodoId, text: taskInput, userId, completed: false }]);
        setTaskInput('');
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  const handleToggleComplete = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      try {
        await updateTodoCompletion(id, !todo.completed);
        setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
      } catch (error) {
        console.error('Error updating todo completion:', error);
      }
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <div style={{ width: '100%', maxWidth: '600px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h1 style={{ textAlign: 'center' }}>ToDo List</h1>
        <input
          type="text"
          placeholder="Task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleAddTask();
            }
          }}
          style={{ width: '100%', padding: '10px', boxSizing: 'border-box', marginBottom: '10px' }}
        />
        <button
          onClick={handleAddTask}
          style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Add Task
        </button>
        <ul style={{ listStyle: 'none', padding: '0', marginTop: '20px' }}>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px',
                borderBottom: '1px solid #ccc',
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo.id)}
                style={{ marginRight: '10px' }}
              />
              <span style={{ flexGrow: '1' }}>{todo.text}</span>
              <button
                onClick={() => handleDeleteTask(todo.id)}
                style={{ backgroundColor: 'transparent', border: 'none', color: '#007bff', cursor: 'pointer' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Main;
