
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Game Characters API');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
let characters = [];

// Create
app.post('/characters', (req, res) => {
  const character = req.body;
  characters.push(character);
  res.status(201).send(character);
});

// Read All
app.get('/characters', (req, res) => {
  res.send(characters);
});

// Read One
app.get('/characters/:id', (req, res) => {
  const character = characters.find(c => c.id === parseInt(req.params.id));
  if (!character) {
    return res.status(404).send('Character not found');
  }
  res.send(character);
});

// Update
app.put('/characters/:id', (req, res) => {
  const index = characters.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send('Character not found');
  }
  characters[index] = req.body;
  res.send(characters[index]);
});

// Delete
app.delete('/characters/:id', (req, res) => {
  const index = characters.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send('Character not found');
  }
  const deletedCharacter = characters.splice(index, 1);
  res.send(deletedCharacter);
});
app.get('/characters', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = characters.slice(startIndex, endIndex);
  res.send(results);
});

