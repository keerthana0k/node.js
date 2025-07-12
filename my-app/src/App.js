import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/items')
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newItem }),
    })
      .then((response) => response.json())
      .then((data) => setItems([...items, data]));

    setNewItem('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Items</h1>
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add a new item"
          />
          <button type="submit">Add Item</button>
        </form>
      </header>
    </div>
  );
}

export default App;