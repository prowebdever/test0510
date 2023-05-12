import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function AsteroidDetail({asteroid}) {
  const [open, setOpen] = useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>{asteroid.name}</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Asteroid Detail</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {asteroid.name}
          </DialogContentText>
          url: {asteroid.nasa_jpl_url}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AsteroidDetail;