import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import AsteroidList from './components/AsteroidList';
import FavouriteList from './components/FavouriteList';
import AsteroidDetail from './components/AsteroidDetail';

function App() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="Asteroids" value="1" />
          <Tab label="Favourites" value="2" />
        </TabList>
      </Box>
      <TabPanel value="1">
        <AsteroidList startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate}/>
      </TabPanel>
      <TabPanel value="2">
        <FavouriteList />
      </TabPanel>
    </TabContext>
    </Box>
  );
}

export default App;