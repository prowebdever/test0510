import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';
import AsteroidDetail from './AsteroidDetail';

function FavouriteList() {
  const [asteroids, setAsteroids] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://127.0.0.1:5000/api/favourites');
      setAsteroids(response.data);
    };
    fetchData();
  }, []);

  const handleRemoveFromFavourites = async (asteroid) => {
    const response = await axios.delete(`http://127.0.0.1:5000/api/favourites/${asteroid.id}`);
    if(response.status === 204) {
      setAsteroids(asteroids.filter(function(item) {
        return item.id !== asteroid.id;
      }));
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="favourites table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">NASA JPL URL</TableCell>
            <TableCell align="right">Potentially Hazardous</TableCell>
            <TableCell align="right">Remove from Favourites</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {asteroids.map((asteroid) => (
            <TableRow key={asteroid.id}>
              <TableCell component="th" scope="row">
                <AsteroidDetail asteroid={asteroid} />
              </TableCell>
              <TableCell align="right">{asteroid.nasa_jpl_url}</TableCell>
              <TableCell align="right">{asteroid.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</TableCell>
              <TableCell align="right">
                <Button variant="contained" onClick={() => handleRemoveFromFavourites(asteroid)}>
                    Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default FavouriteList;