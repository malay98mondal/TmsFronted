// EditAdminDialog.tsx
import { Dialog, DialogTitle, DialogContent, Tooltip, IconButton, Grid } from '@mui/material';
import EditUserForm from './EditUserForm';
import CancelIcon from '@mui/icons-material/Cancel';



const EditUserDialog = (props: any) => {
    const { open, onClose, initialValues, onSubmit } = props;
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <Grid sx={{display:'flex', justifyContent: 'space-between'}}>
            <DialogTitle sx={{ color: 'primary.main', fontWeight: 'bold',fontSize:'1.5em' }}>Edit User</DialogTitle>
            <Tooltip title="Close" onClick={onClose} sx={{ color: 'red', }}>
            <IconButton >
              <CancelIcon sx={{ fontSize: '1.4em' }} />
            </IconButton>
          </Tooltip>
          </Grid>
            <DialogContent>
                <EditUserForm
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    onCancel={onClose}
                />
            </DialogContent>
        </Dialog>
    );
};

export default EditUserDialog;
