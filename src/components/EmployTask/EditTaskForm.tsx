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

interface EditTaskFormProps {
  open: boolean;
  onClose: () => void;
  initialValues: any; // Define your task type here
  onSubmit: (values: any) => void; // Function to handle form submission
}

// Normalization function to format date to YYYY-MM-DD
const normalizeDate = (date: any) => {
  return date ? new Date(date).toISOString().split('T')[0] : '';
};

// Validation schema using Yup
const validationSchema = Yup.object({
  Status: Yup.string().required('Status is required'),
  Remarks: Yup.string().test(
    'is-overdue',
    'Remarks is required when the task is overdue',
    function (value) {
      const { End_Date, End_Time } = this.parent; // Access sibling fields

      // Create end date-time string in correct format
      const endDateTimeString = `${normalizeDate(End_Date)}T${End_Time}:00`; // Ensure seconds are added
      const endDateTime = new Date(endDateTimeString); // Parse as Date object
      const isOverdue = endDateTime < new Date(); // Check if the task is overdue

      // If overdue, return whether Reason is provided
      return !isOverdue || (value && value.trim() !== '');
    }
  ),
});

const EditTaskForm: React.FC<EditTaskFormProps> = ({
  open,
  onClose,
  initialValues,
  onSubmit,
}) => {
  console.log('Initial Values:', initialValues); // Debugging statement for initial values

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log('Submitted Values:', values); // Debugging statement for submitted values
            onSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => {
            // Normalize and format the End DateTime string
            const endDateTimeString = `${normalizeDate(values.End_Date)}T${values.End_Time}:00`; // Append seconds
            const endDateTime = new Date(endDateTimeString);
            const isOverdue = endDateTime < new Date();

            // Debugging statements
            console.log('End DateTime String:', endDateTimeString);
            console.log('Parsed End DateTime:', endDateTime);
            console.log('Current DateTime:', new Date());
            console.log('Is Overdue:', isOverdue);

            return (
              <Form>
                {/* <TextField
                                    name="Task_Details"
                                    label="Task Details"
                                    fullWidth
                                    variant="outlined"
                                    margin="dense"
                                    value={values.Task_Details}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.Task_Details && errors.Task_Details)}
                                    helperText={
                                        touched.Task_Details && errors.Task_Details
                                            ? String(errors.Task_Details)
                                            : ''
                                    }
                                /> */}
                {/* <TextField
                                    name="Start_Time"
                                    label="Start Time"
                                    fullWidth
                                    variant="outlined"
                                    margin="dense"
                                    value={values.Start_Time}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.Start_Time && errors.Start_Time)}
                                    helperText={
                                        touched.Start_Time && errors.Start_Time
                                            ? String(errors.Start_Time)
                                            : ''
                                    }
                                /> */}
                {/* <TextField
                                    name="End_Date"
                                    label="End Date"
                                    fullWidth
                                    variant="outlined"
                                    margin="dense"
                                    value={values.End_Date}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.End_Date && errors.End_Date)}
                                    helperText={
                                        touched.End_Date && errors.End_Date
                                            ? String(errors.End_Date)
                                            : ''
                                    }
                                /> */}
                {/* <TextField
                                    name="End_Time"
                                    label="End Time"
                                    fullWidth
                                    variant="outlined"
                                    margin="dense"
                                    value={values.End_Time}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.End_Time && errors.End_Time)}
                                    helperText={
                                        touched.End_Time && errors.End_Time
                                            ? String(errors.End_Time)
                                            : ''
                                    }
                                /> */}
                <Grid container spacing={2}>

                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined" margin="dense" error={Boolean(touched.Status && errors.Status)}>
                      <InputLabel>Status</InputLabel>
                      <Select
                        name="Status"
                        value={values.Status}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label="Status"
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
                      )}                    </FormControl>
                  </Grid>

                  {isOverdue && (
                    <Grid item xs={12}>
                      <TextField
                        name="Remarks"
                        label="Remarks"
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        value={values.Remarks}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.Remarks && errors.Remarks)}
                        helperText={touched.Remarks && errors.Remarks ? String(errors.Remarks) : ''}
                      />
                    </Grid>
                  )}
                </Grid >

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
