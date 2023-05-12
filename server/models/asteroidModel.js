const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/favourites.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the favourites database.');
});

const createTable = () => {
  const sql = `CREATE TABLE IF NOT EXISTS favourites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    nasa_jpl_url TEXT NOT NULL,
    is_potentially_hazardous_asteroid BOOLEAN NOT NULL
  );`;

  db.run(sql, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Favourites table created successfully.');
  });
};

const insertAsteroid = (asteroid) => {
  const sql = `INSERT INTO favourites (name, nasa_jpl_url, is_potentially_hazardous_asteroid) VALUES (?, ?, ?)`;
  const values = [asteroid.name, asteroid.nasa_jpl_url, asteroid.is_potentially_hazardous_asteroid];

  db.run(sql, values, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log(`Asteroid ${asteroid.name} added to favourites.`);
  });
};

const getAllAsteroids = (callback) => {
  const sql = `SELECT * FROM favourites`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
    }
    callback(rows);
  });
};

module.exports = {
  createTable,
  insertAsteroid,
  getAllAsteroids,
};