import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Tooltip, IconButton, Box } from '@mui/material';
import UserRegistrationForm from './UserRegistrationForm';
import CancelIcon from '@mui/icons-material/Cancel';



const AddUserDialog = (props:any) => {

  const { open, onClose, fetchUsers, page, rowsPerPage,searchQuery } = props;
  return (
    <>
    
    <Dialog open={open} onClose={onClose}>
      <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <DialogTitle sx={{ color: 'primary.main', fontWeight: 'bold',fontSize:'1.5em' }}>Add New User</DialogTitle>
        <Tooltip title="Close" onClick={onClose} sx={{ color: 'red' }}>
          <IconButton>
            <CancelIcon sx={{ fontSize: '1.4em' }} />
          </IconButton>
        </Tooltip>
      </Grid>
      <DialogContent>
        <UserRegistrationForm fetchUsers={fetchUsers} onClose={onClose} page={page} rowsPerPage={rowsPerPage} />
      </DialogContent>

    </Dialog>
    </>
  );
};

export default AddUserDialog;
