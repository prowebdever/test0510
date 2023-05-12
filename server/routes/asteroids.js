const express = require('express');
const axios = require('axios');
const { db } = require('../database');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://api.nasa.gov/neo/rest/v1/feed', {
            params: {
              start_date: req.query.start_date,
              end_date: req.query.end_date,
              api_key: 'DEMO_KEY',
            },
          });
        const asteroids = Object.values(response.data.near_earth_objects).flat();
        res.status(200).send(asteroids);
      } catch (error) {
        console.error(error.message);
        // res.status(500).send('Internal server error');      
    } finally {
        console.error("unknown error");
    }
});

module.exports = router;