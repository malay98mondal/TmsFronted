import React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Tooltip, IconButton } from '@mui/material';
import RegisterAgentForm from './RegisterAgentForm'

interface AddUserDialogProps {
  open: boolean;
  onClose: (shouldFetch?: boolean) => void;
  fetchAgents: (page: number, limit: number, search: string) => void;
  page: number;
  rowsPerPage: number;
}

const AddAgentDialog: React.FC<AddUserDialogProps> = (props: any) => {
  const {open, onClose, fetchAgents, page, rowsPerPage, searchQuery} = props;
  return (
    <Dialog open={open} onClose={onClose}>
      <Grid xs={12} container spacing={2} paddingTop={2} justifyContent="space-between">
        <DialogTitle sx={{marginLeft:'15px',color: 'primary.main', fontWeight: 'bold', fontSize: '1.5em'}}>Add New Agent</DialogTitle>
        <DialogActions >
          <Tooltip title="Close" onClick={onClose} sx={{ color: 'red', }}>
            <IconButton >
              <CancelIcon sx={{ fontSize: '1.4em' }} />
            </IconButton>
          </Tooltip>
        </DialogActions>
      </Grid>
      <DialogContent>
        <RegisterAgentForm fetchAgents={fetchAgents} onClose={onClose}
        page={page} rowsPerPage={rowsPerPage}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddAgentDialog;
