import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import AsteroidDetail from './AsteroidDetail';
import axios from 'axios';

function AsteroidList({startDate, endDate, setStartDate, setEndDate}) {
  const [asteroids, setAsteroids] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      console.log(startDate, endDate);
      const response = await axios.get(`http://127.0.0.1:5000/api/asteroids?start_date=${startDate}&end_date=${endDate}`);
      setAsteroids(response.data);
    };
    if(startDate !== '' && endDate !== '') {
      fetchData();
    }
  }, [startDate, endDate]);

  const handleAddToFavourites = async (asteroid) => {
    await axios.post('http://127.0.0.1:5000/api/favourites', asteroid);
  };

  return (
    <div>
      <div>
        <TextField id="startDate" label="Start Date" type="date" InputLabelProps={{ shrink: true }} onChange={(e)=>setStartDate(e.target.value)} value={startDate}/>
        <TextField id="endDate" label="End Date" type="date" InputLabelProps={{ shrink: true }} onChange={(e)=>setEndDate(e.target.value)} value={endDate}/>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="asteroid table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">NASA JPL URL</TableCell>
              <TableCell align="right">Potentially Hazardous</TableCell>
              <TableCell align="right">Add to Favourites</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {asteroids.map((asteroid) => (
              <TableRow key={asteroid.id}>
                <TableCell component="th" scope="row">
                  <AsteroidDetail asteroid={asteroid}></AsteroidDetail>
                </TableCell>
                <TableCell align="right">{asteroid.nasa_jpl_url}</TableCell>
                <TableCell align="right">{asteroid.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" onClick={() => handleAddToFavourites(asteroid)}>
                    Add
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

  );
}

export default AsteroidList;