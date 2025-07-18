import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [products, setProducts] =  useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/items')
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5001/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5001/api/items', {
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
       <h1>Product Info</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <strong>{product.name}</strong><br />
            ${product.price} - {product.category}<br />
            {product.description}<br />
            <em>{product.stock}</em>
            <hr />
          </li>
        ))}
      </ul>
  
      </header>
    </div>

    
  );

}



export default App;