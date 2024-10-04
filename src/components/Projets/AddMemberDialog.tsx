import React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, IconButton, Tooltip } from '@mui/material';
import AddMemberForm from './AddMemberForm';

interface AddUserDialogProps {
  open: boolean;
  onClose: (shouldFetch: boolean) => void;
  fetchGroups: () => void;
  onAdd: (group: any) => void;
}

const AddMemberDialog: React.FC<AddUserDialogProps> = ({ open, onClose, fetchGroups, onAdd }) => {
  return (
    <Dialog open={open} onClose={onClose}>
       <Grid xs={12} container spacing={2} paddingTop={2} justifyContent="space-between">
        <DialogTitle sx={{paddingLeft:"40px",color: 'primary.main', fontWeight: 'bold', fontSize: '1.5em'}}>Add New Group</DialogTitle>
        <DialogActions >
          <Tooltip title="Close"  sx={{ color: 'red', }}>
            <IconButton  >
              <CancelIcon onClick={() => onClose(false)} sx={{ fontSize: '1.4em' }} />
            </IconButton>
          </Tooltip>
        </DialogActions>
      </Grid>
      {/* <DialogTitle>Add New Group</DialogTitle> */}
      <DialogContent>
        <AddMemberForm fetchGroups={fetchGroups} onClose={onClose} onAdd={onAdd} />
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