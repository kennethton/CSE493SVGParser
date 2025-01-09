const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Parse JSON
app.use(express.static('../front-end')); // Serve static files

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.get('/api/items', (req, res) => {
  res.json([{ id: 1, name: 'Item 1', size: 'M' }]);
});

const mongoose = require('mongoose');

mongoose.connect('mongodb://your_connection_string');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to the database');
});