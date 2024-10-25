import React, { useState, useEffect, useMemo } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, FormHelperText, Select, FormControl, InputLabel, Autocomplete } from '@mui/material';
import { getProjectEmployees, updateTaskTeamLead } from '../../apiRequest/TaskRoutes/TaskRoutes';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface EditTaskFormProps {
  open: boolean;
  onClose: () => void;
  task: any;
  projectId: number;
  fetchTasks: () => void;
}
interface Employee {
  Employee: {
    Employee_name: string; // Adjust if necessary
  };
  Emp_Id: number;
}
const validationSchema = Yup.object({
  Task_Details: Yup.string().required('Task Details are required'),
  createdAt: Yup.string().required('Created date is required'),

  Start_Date: Yup.date().required('Start Date is required'),
  End_Date: Yup.date().required('End Date is required'),

  Start_Time: Yup.string()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format')
    .required('Start Time is required'),

  End_Time: Yup.string()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format')
    .required('End Time is required'),

  Assigned_Emp_Id: Yup.number().required('Assigned employee is required'),

  // Custom validation for Start Date/Time against `createdAt` and End Date/Time
}).test('startDateTime', 'Start date and time cannot be earlier than the created date/time', function (value) {
  const { Start_Date, Start_Time, createdAt } = value;

  // Debugging logs
  console.log("Start_Date:", Start_Date);
  console.log("Start_Time:", Start_Time);
  console.log("createdAt:", createdAt);

  if (Start_Date && Start_Time && createdAt) {
    const createdAtDate = new Date(createdAt);
    const [hours, minutes] = Start_Time.split(':');
    const startDateTime = new Date(Start_Date);
    startDateTime.setHours(Number(hours), Number(minutes), 0, 0);

    console.log("createdAtDate:", createdAtDate);
    console.log("startDateTime:", startDateTime);

    if (startDateTime < createdAtDate) {
      console.log('Start date/time is earlier than createdAt.');
      return this.createError({
        path: 'Start_Date',
        message: 'Start date/time is earlier than created date/time',
      });
    }
  }
  return true;
}).test('endDateTime', 'Start date/time cannot be after end date/time', function (value) {
  const { Start_Date, Start_Time, End_Date, End_Time } = value;

  // Debugging logs
  console.log("Start_Date:", Start_Date);
  console.log("Start_Time:", Start_Time);
  console.log("End_Date:", End_Date);
  console.log("End_Time:", End_Time);

  if (Start_Date && Start_Time && End_Date && End_Time) {
    const [startHours, startMinutes] = Start_Time.split(':');
    const [endHours, endMinutes] = End_Time.split(':');

    const startDateTime = new Date(Start_Date);
    const endDateTime = new Date(End_Date);

    // Set hours and minutes separately to avoid UTC conversion issues
    startDateTime.setHours(Number(startHours), Number(startMinutes), 0, 0);
    endDateTime.setHours(Number(endHours), Number(endMinutes), 0, 0);

    console.log("startDateTime:", startDateTime);
    console.log("endDateTime:", endDateTime);

    if (startDateTime > endDateTime) {
      console.log('Start date/time is after end date/time.');
      return this.createError({
        path: 'End_Time',
        message: 'Start date/time is after end date/time',
      });
    }
  }
  return true;
}).test('endDateTimeCheck', 'End date/time cannot be earlier than start date/time', function (value) {
  const { Start_Date, Start_Time, End_Date, End_Time } = value;

  // Debugging logs
  console.log("Start_Date:", Start_Date);
  console.log("Start_Time:", Start_Time);
  console.log("End_Date:", End_Date);
  console.log("End_Time:", End_Time);

  if (Start_Date && Start_Time && End_Date && End_Time) {
    const [startHours, startMinutes] = Start_Time.split(':');
    const [endHours, endMinutes] = End_Time.split(':');

    const startDateTime = new Date(Start_Date);
    const endDateTime = new Date(End_Date);

    startDateTime.setHours(Number(startHours), Number(startMinutes), 0, 0);
    endDateTime.setHours(Number(endHours), Number(endMinutes), 0, 0);

    console.log("startDateTime:", startDateTime);
    console.log("endDateTime:", endDateTime);

    if (endDateTime < startDateTime) {
      console.log('End date/time is earlier than start date/time.');
      return this.createError({
        path: 'End_Date',
        message: 'End date/time is earlier than start date/time',
      });
    }
  }
  return true;
});



function EditTaskForm({ open, onClose, task, fetchTasks, projectId }: EditTaskFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Reset error on dialog open/close
    setError('');
  }, [open]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    setError('');
    try {
      await updateTaskTeamLead(values.Task_details_Id, values); // Call the update API
      fetchTasks(); // Refresh tasks after edit
      onClose(); // Close dialog
    } catch (error: any) {
      setError('Error updating task');
      console.error('Error updating task:', error);
    } finally {
      setLoading(false);
    }
  };

  function normalizeDate(date) {
    // Converts date to 'YYYY-MM-DD' format
    const d = new Date(date);
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const day = `0${d.getDate()}`.slice(-2);
    return `${d.getFullYear()}-${month}-${day}`;
  }
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [currentPage, setCurrentPage] = useState(0); // State for pagination
  const [page, setPage] = useState(0); // For pagination


  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getProjectEmployees(projectId, searchTerm, 10, page); // Fetch based on search and page
        setEmployees(data);
      } catch (err) {
        setError('Failed to fetch project employees.');
        console.error('Error fetching employees:', err);
      }
    };

    if (open) {
      fetchEmployees();
    }
  }, [open, projectId, searchTerm, currentPage]);


  function setFieldValue(arg0: string, arg1: string | number) {
    throw new Error('Function not implemented.');
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={task}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnChange={true} // Enable validation on change
          validateOnBlur={true}

        >
          {({ values, handleChange, handleSubmit, handleBlur, touched, errors }) => (
            <Form>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <TextField
                fullWidth
                label="Task Details"
                name="Task_Details"
                value={values.Task_Details}
                onChange={handleChange}
                margin="dense"
                onBlur={handleBlur}

                error={touched.Task_Details && Boolean(errors.Task_Details)}
                helperText={touched.Task_Details && typeof errors.Task_Details === 'string' ? errors.Task_Details : undefined}
              />

              <TextField
                fullWidth
                label="Start Date"
                type="date"
                name="Start_Date"
                value={normalizeDate(values.Start_Date)}
                onChange={handleChange}
                onBlur={handleBlur}

                margin="dense"
                InputLabelProps={{ shrink: true }}
                error={touched.Start_Date && Boolean(errors.Start_Date)}
                helperText={touched.Start_Date && typeof errors.Start_Date === 'string' ? errors.Start_Date : undefined}
              />
              <TextField
                fullWidth
                label="End Date"
                type="date"
                name="End_Date"
                value={normalizeDate(values.End_Date)}
                onChange={handleChange}
                margin="dense"
                onBlur={handleBlur}
                InputLabelProps={{ shrink: true }}
                error={touched.End_Date && Boolean(errors.End_Date)}
                helperText={touched.End_Date && typeof errors.End_Date === 'string' ? errors.End_Date : undefined}
              />
              <TextField
                fullWidth
                label="Start Time"
                type="time"
                onBlur={handleBlur}

                name="Start_Time"
                value={values.Start_Time}
                onChange={handleChange}
                margin="dense"
                InputLabelProps={{ shrink: true }}
                error={touched.Start_Time && Boolean(errors.Start_Time)}
                helperText={touched.Start_Time && typeof errors.Start_Time === 'string' ? errors.Start_Time : undefined}
              />
              <TextField
                fullWidth
                label="End Time"
                type="time"
                name="End_Time"
                onBlur={handleBlur}

                value={values.End_Time}
                onChange={handleChange}
                margin="dense"
                InputLabelProps={{ shrink: true }}
                error={touched.End_Time && Boolean(errors.End_Time)}
                helperText={touched.End_Time && typeof errors.End_Time === 'string' ? errors.End_Time : undefined}
              />


              <FormControl fullWidth margin="dense" error={touched.Assigned_Emp_Id && Boolean(errors.Assigned_Emp_Id)}>
                <Autocomplete
                  options={employees}
                  getOptionLabel={(option) => option.Employee.Employee_name}
                  onChange={(event, newValue) => {
                    setFieldValue('Assigned_Emp_Id', newValue ? newValue.Emp_Id : '');
                  }}
                  onInputChange={(event, value) => {
                    setSearchTerm(value);
                    setPage(0);
                    setEmployees([]); // Clear previous results on new search
                  }}
                  onScroll={(event) => {
                    const target = event.target as HTMLElement;
                    const bottom = target.scrollHeight === target.scrollTop + target.clientHeight;
                    if (bottom && !loading) {
                      setPage((prev) => prev + 1); // Load more when scrolled to bottom
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Assigned Employee"
                      variant="outlined"
                      error={touched.Assigned_Emp_Id && Boolean(errors.Assigned_Emp_Id)}
                    />
                  )}
                  loading={loading}
                  filterOptions={(options, { inputValue }) => {
                    return options.filter((option) =>
                      option.Employee.Employee_name.toLowerCase().includes(inputValue.toLowerCase())
                    );
                  }}
                />
                <FormHelperText>
                  {touched.Assigned_Emp_Id && errors.Assigned_Emp_Id ? (
                    typeof errors.Assigned_Emp_Id === 'string' ? (
                      <span>{errors.Assigned_Emp_Id}</span>
                    ) : Array.isArray(errors.Assigned_Emp_Id) ? (
                      <span>{errors.Assigned_Emp_Id.join(', ')}</span>
                    ) : null
                  ) : null}
                </FormHelperText>
              </FormControl>


              <DialogActions>
                <Button onClick={onClose} disabled={loading}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save'}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default EditTaskForm;
