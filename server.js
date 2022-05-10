const fs = require('fs');
const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('./helpers/fsUtils');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use (express.urlencoded({ extended: true}));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) => {
  const storedNotes = fs.readFileSync(path.join(__dirname, './db/db.json'), "utf-8");
  const parsedNotes = JSON.parse(storedNotes);
  res.json(parsedNotes);
});

app.post('/api/notes', (req, res) => {
  req.body.id = uuidv4();
  readAndAppend(req.body, './db/db.json').then(readFromFile('./db/db.json'))
});

app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id !== noteId);

      writeToFile("./db/db.json", result);
    });
})

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);