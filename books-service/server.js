const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const db = require('./models');
const bookSchema = require('./bookSchema');
const bookResolver = require('./bookResolver');
const app = express();
const port = 5000;

// Utilisation de GraphQL pour gérer les requêtes
app.use('/graphql', graphqlHTTP({
  schema: bookSchema,
  rootValue: bookResolver,
  graphiql: true
}));
app.use(bodyParser.json());

// Utilisation de body-parser pour analyser les demandes HTTP
app.use(bodyParser.urlencoded({ extended: true }));

// Implémentation de l'API REST
app.get('/books', (req, res) => {
  db.all(`SELECT * FROM books`, [], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/book/:id', (req, res) => {
  db.get(`SELECT * FROM books WHERE id = ?`, [req.params.id], (err, row) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json(row);
  });
});

app.post('/book', (req, res) => {
  const { title, author, publicationYear } = req.body;
  db.run(`INSERT INTO books (title, author, publicationYear) VALUES (?, ?, ?)`, [title, author, publicationYear], (err) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({ "message": "success" });
  });
});

app.put('/book/:id', (req, res) => {
  const { title, author, publicationYear } = req.body;
  db.run(`UPDATE books SET title = ?, author = ?, publicationYear = ? WHERE id = ?`, [title, author, publicationYear, req.params.id], (err) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({ "message": "success" });
  });
});

app.delete('/book/:id', (req, res) => {
  db.run(`DELETE FROM books WHERE id = ?`, [req.params.id], (err) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({ "message": "success" });
  });
});

// Check if the server is being run in a test environment before logging
if (process.env.NODE_ENV !== 'test') {
  // Lancement du serveur
  app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}.`);
  });
}

module.exports = app;  // Export the app for testing purposes
