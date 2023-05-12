const sqlite3 = require('sqlite3').verbose();

const DB_PATH = './db/asteroids.db';

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log(`Connected to the SQLite database at ${DB_PATH}`);
  }
});

const createTables = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS favourites (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      nasa_jpl_url TEXT NOT NULL,
      is_potentially_hazardous_asteroid INTEGER NOT NULL
    )
  `;
  db.run(sql, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Created favourites table');
    }
  });
};

module.exports = { db, createTables };