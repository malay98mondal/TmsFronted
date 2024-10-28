import React, { useEffect } from 'react';
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


interface FormValues {
  Status: string;
  Actual_Start_Date: string | null; // Adjust type based on your expected data
  Actual_Start_Time: string | null; // Adjust type based on your expected data
  Remarks?: string; // Optional field
  End_Date: string; // Adjust based on your date format
  End_Time: string; // Adjust based on your time format
  Start_Date: string; // Add this based on your form requirements
  Start_Time: string; // Add this based on your form requirements
}

function normalizeDate(date) {
  // Converts date to 'YYYY-MM-DD' format
  const d = new Date(date);
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const day = `0${d.getDate()}`.slice(-2);
  return `${d.getFullYear()}-${month}-${day}`;
}


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
        
        // Combine End Date and End Time to check if task is overdue
        const endDateTimeString = `${normalizeDate(End_Date)}T${End_Time}:00`;
        const endDateTime = new Date(endDateTimeString);
        const isOverdue = endDateTime < new Date(); // Check if task is overdue

        // Remarks are required if the task is overdue
        return !isOverdue || (value && value.trim() !== '');
      }
    ),

  Actual_Start_Date: Yup.date()
    .nullable()
    .test('validate-actual-start-date', 'Invalid Actual Start Date', function (value) {
      const { Start_Date, Start_Time, createdAt, Actual_Start_Time } = this.parent;

      // Normalize the Actual Start Date and the Start Date from parent
      if (value) {
        const actualStartDate = new Date(value); // Actual Start Date
        const startDate = new Date(`${normalizeDate(Start_Date)}T${Start_Time}:00`); // Start DateTime
        const creationDate = new Date(createdAt); // Creation Date
        const actualStartTime = Actual_Start_Time || new Date().toTimeString().slice(0, 5); // Default to current time if null

        // Combine Actual Start Date and Time into a DateTime
        const actualStartDateTime = new Date(`${normalizeDate(value)}T${actualStartTime}:00`);

        // Subtract one day from the actual start date
        const adjustedActualStartDateTime = new Date(actualStartDateTime);
        adjustedActualStartDateTime.setDate(adjustedActualStartDateTime.getDate());

        // Ensure Actual Start DateTime does not exceed Start DateTime
        if (adjustedActualStartDateTime > startDate) {
          return this.createError({ message: `Actual Start Date cannot be more than ${startDate}` });
        }

        // Ensure Actual Start DateTime is not before the task creation date
        if (adjustedActualStartDateTime < creationDate) {
          return this.createError({ message: `Actual Start Date cannot be less than ${creationDate}` });
        }
      }

      // If Actual Start Date is not provided, it's valid (nullable)
      return true;
    }),

  Actual_Start_Time: Yup.string()
    .nullable()
    .test('validate-actual-start-time', 'Actual Start Time should not be null if starting early', function (value) {
      const { Start_Date, Start_Time } = this.parent;

      // Combine Start Date and Time to check if task is starting early
      const startDateTimeString = `${normalizeDate(Start_Date)}T${Start_Time}:00`;
      const startDateTime = new Date(startDateTimeString);

      // Check if the task is starting early (Start DateTime is in the future)
      if (startDateTime > new Date()) {
        // Actual Start Time should not be empty when starting early
        if (!value || value.trim() === '') {
          return this.createError({ message: 'Actual Start Time is required when starting early' });
        }
      }

      // If task is not starting early or Actual Start Time is provided, it's valid
      return true;
    }),
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




const TeamLeadOwnTaskEdit = ({ open, onClose, initialValues, onSubmit }: { open: boolean; onClose: () => void; initialValues: FormValues; onSubmit: (values: FormValues) => void; }) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{ paper: classes.dialog }}
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
            onSubmit(updatedValues);
            setSubmitting(false);
          }}
        >
          {({ values, handleChange, handleBlur, errors, touched, isSubmitting, setFieldValue }) => {
            const endDateTimeString = `${normalizeDate(values.End_Date)}T${values.End_Time}:00`;
            const endDateTime = new Date(endDateTimeString);
            const isOverdue = endDateTime < new Date();

            const startDateTimeString = `${normalizeDate(values.Start_Date)}T${values.Start_Time}:00`;
            const startDateTime = new Date(startDateTimeString);
            const isStartedBeforeStart = startDateTime > new Date();

            // Effect to clear Actual Start Date and Time if overdue
            useEffect(() => {
              if (isOverdue) {
                // Clear Actual Start Date and Time if overdue
                setFieldValue('Actual_Start_Date', null);
                setFieldValue('Actual_Start_Time', null);
              } else if (!isOverdue && !isStartedBeforeStart) {
                // Clear Actual Start Date and Time if both conditions are false
                setFieldValue('Actual_Start_Date', null);
                setFieldValue('Actual_Start_Time', null);
              }
            }, [isOverdue, isStartedBeforeStart, setFieldValue]);
            console.log('is overdue', isOverdue);
            console.log('is start before', isStartedBeforeStart);

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
                        className={classes.inputField}
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
                        className={classes.inputField}
                      />
                    </Grid>
                  )}
                  {isStartedBeforeStart && (
                    <>
                      <Grid item xs={12}>
                        <TextField
                          name="Actual_Start_Date"
                          label="Actual Start Date"
                          type="date"
                          variant="outlined"
                          margin="dense"
                          value={values.Actual_Start_Date ? normalizeDate(values.Actual_Start_Date) : ''} // Check if it's null
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.Actual_Start_Date && errors.Actual_Start_Date)}
                          helperText={touched.Actual_Start_Date && errors.Actual_Start_Date ? String(errors.Actual_Start_Date) : ''}
                          className={classes.inputField}
                          InputLabelProps={{ shrink: true }} // This prevents the label from shrinking into the field

                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name="Actual_Start_Time"
                          label="Actual Start Time"
                          type="time"
                          variant="outlined"
                          margin="dense"
                          value={values.Actual_Start_Time}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.Actual_Start_Time && errors.Actual_Start_Time)}
                          helperText={touched.Actual_Start_Time && errors.Actual_Start_Time ? String(errors.Actual_Start_Time) : ''}
                          className={classes.inputField}
                          InputLabelProps={{ shrink: true }} // This prevents the label from shrinking into the field

                        />
                      </Grid>
                    </>
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

export default TeamLeadOwnTaskEdit;