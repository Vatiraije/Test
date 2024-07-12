import React, { useState } from 'react';

// Define the Task interface
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const ToDoListForm: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState('');

  const handleAddTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([
        ...tasks,
        {
          id: tasks.length + 1,
          title: taskInput,
          completed: false,
        },
      ]);
      setTaskInput('');
    }
  };

  const handleToggleComplete = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
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
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px',
                borderBottom: '1px solid #ccc',
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(task.id)}
                style={{ marginRight: '10px' }}
              />
              <span style={{ flexGrow: 1 }}>{task.title}</span>
              <button
                onClick={() => handleDeleteTask(task.id)}
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

export default ToDoListForm;
