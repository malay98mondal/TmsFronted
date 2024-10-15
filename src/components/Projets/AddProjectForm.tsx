import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface AddProjectDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: { projectName: string; Status: string }) => void;
}

const AddProjectForm: React.FC<AddProjectDialogProps> = ({ open, onClose, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      projectName: '',
      Status: '', // Ensure this is an empty string to trigger validation
    },
    validationSchema: Yup.object({
      projectName: Yup.string().required('Project Name is required'),
      Status: Yup.string().required('Status is required'), // Ensure validation is here
    }),
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm(); // Reset the form after submission
      onClose(); // Close the dialog after submission
    },
  });

  const handleClose = () => {
    formik.resetForm(); // Reset form values and errors
    onClose(); // Close the dialog
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Project</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="projectName"
            name="projectName"
            label="Project Name"
            value={formik.values.projectName}
            onChange={formik.handleChange}
            error={formik.touched.projectName && Boolean(formik.errors.projectName)}
            helperText={formik.touched.projectName && formik.errors.projectName}
            margin="dense"
            onBlur={formik.handleBlur}
          />

          <FormControl fullWidth margin="dense" error={formik.touched.Status && Boolean(formik.errors.Status)}>
            <InputLabel id="Status-label">Project Status</InputLabel>
            <Select
              labelId="Status-label"
              id="Status"
              name="Status" // Ensure this matches the field in initialValues
              value={formik.values.Status}
              onChange={formik.handleChange}
              label="Project Status"
              onBlur={formik.handleBlur} // Important for touched state
            >
              
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
            {formik.touched.Status && formik.errors.Status && (
              <div style={{ marginLeft:'1.4em', color: '#d32f2f', fontSize: '12px' }}>{formik.errors.Status}</div>
            )}
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Cancel</Button>
        <Button onClick={formik.submitForm} color="primary">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProjectForm;
