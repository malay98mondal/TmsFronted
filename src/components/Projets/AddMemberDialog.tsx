import React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, IconButton, Tooltip } from '@mui/material';
import AddMemberForm from './AddMemberForm';

interface AddUserDialogProps {
  open: boolean;
  onClose: (shouldFetch: boolean) => void;
  fetchEmployees: () => void;
}

const AddMemberDialog: React.FC<AddUserDialogProps> = ({ open, onClose, fetchEmployees }) => {
  return (
    <Dialog open={open} onClose={onClose}>
       <Grid xs={12} container spacing={2} paddingTop={2} justifyContent="space-between" sx={{display:'flex'}} >
        <Grid>
        <DialogTitle sx={{paddingLeft:"40px",color: 'primary.main', fontWeight: 'bold', fontSize: '1.5em'}}>Add New Member</DialogTitle>
        </Grid>
        <Grid>

        <DialogActions >
          <Tooltip title="Close"  sx={{ color: 'red', }}>
            <IconButton  >
              <CancelIcon onClick={() => onClose(false)} sx={{ fontSize: '1.4em' }} />
            </IconButton>
          </Tooltip>
        </DialogActions>
        </Grid>
      </Grid>
      {/* <DialogTitle>Add New Group</DialogTitle> */}
      <DialogContent>
        <AddMemberForm fetchEmployees={fetchEmployees} onClose={onClose}  />
      </DialogContent>
      {/* <DialogActions>
        <Button onClick={() => onClose(false)} color="primary">
          Cancel
        </Button>
      </DialogActions> */}
    </Dialog>
  );
};

export default AddMemberDialog;