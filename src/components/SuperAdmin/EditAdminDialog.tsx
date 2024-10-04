// EditAdminDialog.tsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, Tooltip, IconButton, Grid } from '@mui/material';
import EditAdminForm from './EditAdminForm';
import CancelIcon from '@mui/icons-material/Cancel';


// interface EditAdminDialogProps {
//     open: boolean;
//     onClose: () => void;
//     initialValues: {
//         user_name:string;
//         first_name: string;
//         last_name: string;
//         ph_no: string;
//         e_mail: string;
//         phone_ext:string;
//         active:boolean;

//     };
//     onSubmit: (values: any) => void;
// }

const EditAdminDialog = ({ open, onClose, initialValues, onSubmit}) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <Grid sx={{display:'flex',justifyContent:'space-between'}}>
            <DialogTitle>Edit Admin</DialogTitle>
            <Tooltip title="Close" onClick={onClose} sx={{ color: 'red', }}>
            <IconButton >
              <CancelIcon sx={{ fontSize: '1.4em' }} />
            </IconButton>
          </Tooltip>
          </Grid>
            <DialogContent>
                <EditAdminForm
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    onCancel={onClose}      
                />
            </DialogContent>
        </Dialog>
    );
};

export default EditAdminDialog;
