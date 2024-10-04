import React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid } from '@mui/material';
import RegistrationForm from './RegistrationForm';



const AddAdminDialog = (props: any) => {
  const { open, onClose, fetchUsers, page, rowsPerPage, searchQuery } = props;
  return (
    <Dialog open={open} onClose={() => onClose()}>
      <Grid container spacing={2}  paddingTop={2} justifyContent="space-between">
        <DialogTitle sx={{marginLeft:'15px',color: 'primary.main', fontWeight: 'bold', fontSize: '1.5em'}}>Add New Admin</DialogTitle>
        <DialogActions >
          <Tooltip title="Close" onClick={onClose} sx={{color:'red',}}>
            <IconButton>
              <CancelIcon sx={{ fontSize: '1.5em' }}/>
            </IconButton>
          </Tooltip>
        </DialogActions>
      </Grid>

      <DialogContent>
        <RegistrationForm fetchUsers={fetchUsers} onClose={onClose} page={page} rowsPerPage={rowsPerPage} searchQuery={searchQuery} />
      </DialogContent>

    </Dialog>
  );
};

export default AddAdminDialog;
