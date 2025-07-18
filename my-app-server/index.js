const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());

let data = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
];

app.get('/api/items', (req, res) => {
    res.json(data);
});

const products = [
  {
    id: 1,
    name: 'T-Shirt',
    price: 499,
    description: 't-shirt',
    category: 'Clothing',
    stock: 'In Stock'
  },
  {
    id: 2,
    name: 'Headphones',
    price: 1499,
    description: 'Wireless headphones',
    category: 'Electronics',
    stock: 'Only 3 left'
  }
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/items', (req, res) => {
    const newItem = {
        id: data.length + 1,
        name: req.body.name,
    };
    data.push(newItem);
    res.json(newItem);
});

app.listen(port, () => {
    console.log('Server is running on http://localhost:${port}');
});