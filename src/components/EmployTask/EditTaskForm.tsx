import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  FormControl,
  Grid,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@mui/styles';

// Normalization function to format date to YYYY-MM-DD
const normalizeDate = (date: any) => {
  return date ? new Date(date).toISOString().split('T')[0] : '';
};

// Validation schema using Yup
const validationSchema = Yup.object({
  Status: Yup.string().required('Status is required'),
  Remarks: Yup.string()
    .nullable()
    .test(
      'is-overdue',
      'Remarks is required when the task is overdue',
      function (value) {
        const { End_Date, End_Time } = this.parent;

        const endDateTimeString = `${normalizeDate(End_Date)}T${End_Time}:00`;
        const endDateTime = new Date(endDateTimeString);
        const isOverdue = endDateTime < new Date();

        return !isOverdue || (value && value.trim() !== '');
      }
    ),
});

// Styling for fixed size
const useStyles = makeStyles(() => ({
  dialog: {
    width: '400px', // Fixed width for the entire dialog
    maxWidth: '100%', // Ensure it stays responsive on smaller screens
  },
  inputField: {
    width: '100%', // Make input fields take the full width of their container
    boxSizing: 'border-box', // Prevent content overflow
  },
}));

const EditTaskForm = ({ open, onClose, initialValues, onSubmit }: any) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{ paper: classes.dialog }} // Apply fixed width to the dialog
    >
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            ...initialValues,
            Remarks: initialValues.Remarks || '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const updatedValues = {
              ...values,
              Remarks: values.Remarks ? values.Remarks.trim() : '',
            };

            console.log('Submitted Values:', updatedValues);
            onSubmit(updatedValues);
            setSubmitting(false);
          }}
        >
          {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => {
            const endDateTimeString = `${normalizeDate(values.End_Date)}T${values.End_Time}:00`;
            const endDateTime = new Date(endDateTimeString);
            const isOverdue = endDateTime < new Date();

            return (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      error={Boolean(touched.Status && errors.Status)}
                    >
                      <InputLabel>Status</InputLabel>
                      <Select
                        name="Status"
                        value={values.Status}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label="Status"
                        className={classes.inputField} // Apply the fixed width styling
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                      </Select>
                      {touched.Status && errors.Status && (
                        <FormHelperText>{typeof errors.Status === 'string' ? errors.Status : ''}</FormHelperText>
                      )} 
                    </FormControl>
                  </Grid>

                  {isOverdue && (
                    <Grid item xs={12}>
                      <TextField
                        name="Remarks"
                        label="Remarks"
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        value={values.Remarks || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.Remarks && errors.Remarks)}
                        helperText={touched.Remarks && errors.Remarks ? String(errors.Remarks) : ''}
                        className={classes.inputField} // Apply the fixed width styling
                      />
                    </Grid>
                  )}
                </Grid>

                <DialogActions>
                  <Button onClick={onClose} color="primary">
                    Cancel
                  </Button>
                  <Button type="submit" color="primary" disabled={isSubmitting}>
                    Save
                  </Button>
                </DialogActions>
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskForm;
