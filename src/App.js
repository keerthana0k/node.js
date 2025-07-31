// client/src/App.js

import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);  
  const [editingText, setEditingText] = useState(''); 

  // Load tasks
  useEffect(() => {
    fetch('http://localhost:5000/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  // Add new task
  const addTask = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: input })
    })
      .then(res => res.json())
      .then(data => {
        setTasks([...tasks, data]);
        setInput('');
      });
  };

  // Toggle complete
  const toggleComplete = (task) => {
    fetch(`http://localhost:5000/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: task.title, completed: !task.completed })
    }).then(() => {
      setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t));
    });
  };

  // Delete task
  const deleteTask = (id) => {
    fetch(`http://localhost:5000/api/tasks/${id}`, { method: 'DELETE' })
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id));
      });
  };

  // Start editing a task
  const startEditing = (task) => {
    setEditingId(task.id);
    setEditingText(task.title);
  };

  // Save updated task
  const saveTask = (task) => {
    fetch(`http://localhost:5000/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editingText, completed: task.completed })
    }).then(() => {
      setTasks(tasks.map(t => t.id === task.id ? { ...t, title: editingText } : t));
      setEditingId(null);
      setEditingText('');
    });
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task =>
    filter === 'all' ? true :
    filter === 'completed' ? task.completed :
    !task.completed
  );

  return (
    <div style={{ padding: '20px' }}>
      <h1>Task Manager</h1>

      <form onSubmit={addTask}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task"
          required
        />
        <button type="submit">Add Task</button>
      </form>

      <div style={{ margin: '10px 0' }}>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>

      <ul>
        {filteredTasks.map(task => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task)}
            />
            {editingId === task.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={() => saveTask(task)}>Save</button>
              </>
            ) : (
              <>
                {task.title}
                <button onClick={() => startEditing(task)} style={{ marginLeft: '10px' }}> Edit</button>
              </>
            )}
            <button onClick={() => deleteTask(task.id)} style={{ marginLeft: '10px' }}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
