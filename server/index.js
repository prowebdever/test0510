const express = require('express');
const cors = require('cors');
const { createTables } = require('./database');
const asteroidRouter = require('./routes/asteroids');
const favouriteRouter = require('./routes/favourites');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/asteroids', asteroidRouter);
app.use('/api/favourites', favouriteRouter);

createTables();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});