// EditAdminDialog.tsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, Grid, Tooltip, IconButton } from '@mui/material';
import EditAgentForm from './EditAgentForm';
import CancelIcon from '@mui/icons-material/Cancel';


// interface EditAgentDialogProps {
//     open: boolean;
//     onClose: () => void;
//     initialValues: {
//         user_name: string;
//         first_name: string;
//         last_name: string;
//         ph_no: string;
//         phone_ext:string;
//         e_mail: string;
//         active:boolean;
//     };
//     onSubmit: (values: any) => void;
// }

const EditAgentDialog = ({ open, onClose, initialValues, onSubmit }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <Grid sx={{display:'flex',justifyContent:'space-between'}}>
            <DialogTitle>Edit Agent</DialogTitle>
            <Tooltip title="Close" onClick={onClose} sx={{ color: 'red', }}>
            <IconButton >
              <CancelIcon sx={{ fontSize: '1.4em' }} />
            </IconButton>
          </Tooltip>
          </Grid>
            <DialogContent>
                <EditAgentForm
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    onCancel={onClose}
                />
            </DialogContent>
        </Dialog>
    );
};

export default EditAgentDialog;
