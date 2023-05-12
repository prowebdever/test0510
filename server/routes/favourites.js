const express = require('express');
const { db } = require('../database');

const router = express.Router();

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM favourites';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
    //   res.status(500).send('Internal server error');
    } else {
      res.json(rows);
    }
  });
});

router.get('/:id', (req, res) => {
  const sql = 'SELECT * FROM favourites WHERE id = ?';
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      console.error(err.message);
    //   res.status(500).send('Internal server error');
    } else if (!row) {
      res.status(404).send('Asteroid not found');
    } else {
      res.json(row);
    }
  });
});

router.post('/', (req, res) => {
  const { id, name, nasa_jpl_url, is_potentially_hazardous_asteroid } = req.body;
  const sql = 'INSERT INTO favourites (id, name, nasa_jpl_url, is_potentially_hazardous_asteroid) VALUES (?, ?, ?, ?)';

  db.run(sql, [id, name, nasa_jpl_url, is_potentially_hazardous_asteroid], function (err) {
    res.status(200).send({ id: this.lastID });
  });
});

router.delete('/:id', (req, res) => {
  const sql = 'DELETE FROM favourites WHERE id = ?';
  db.run(sql, [req.params.id], (err) => {
    if (err) {
      console.error(err.message);
    //   res.status(500).send('Internal server error');
    } else {
      res.sendStatus(204);
    }
  });
});

module.exports = router;