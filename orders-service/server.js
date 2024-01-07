const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const db = require('./models');
const orderSchema = require('./orderSchema');
const orderResolver = require('./orderResolver');
const app = express();
const port = 5002;

// Utilisation de GraphQL pour gérer les requêtes
app.use('/graphql', graphqlHTTP({
  schema: orderSchema,
  rootValue: orderResolver,
  graphiql: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Implémentation de l'API REST
app.get('/orders', (req, res) => {
  db.all(`SELECT * FROM orders`, [], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/order/:id', (req, res) => {
  db.get(`SELECT * FROM orders WHERE id = ?`, [req.params.id], (err, row) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json(row);
  });
});

app.post('/order', (req, res) => {
  const { customerId, bookId, quantity, totalAmount } = req.body;
  console.log(req.body);
  db.run(`INSERT INTO orders (customerId, bookId, quantity, totalAmount) VALUES (?, ?, ?, ?)`, [customerId,
    bookId, quantity, totalAmount], (err) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.json({ "message": "success" });
    });
});

app.put('/order/:id', (req, res) => {
  const { customerId, bookId, quantity, totalAmount } = req.body;
  db.run(`UPDATE orders SET customerId = ?, bookId = ?, quantity = ?, totalAmount = ? WHERE id = ?`,
    [customerId, bookId, quantity, totalAmount, req.params.id], (err) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.json({ "message": "success" });
    });
});

app.delete('/order/:id', (req, res) => {
  db.run(`DELETE FROM orders WHERE id = ?`, [req.params.id], (err) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({ "message": "success" });
  });
});

// Lancement du serveur
const server = app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}.`);
});

// Exporte l'application pour les tests
module.exports = server;
