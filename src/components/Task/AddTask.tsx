import React, { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    FormHelperText
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createTask, getProjectEmployees } from '../../apiRequest/TaskRoutes/TaskRoutes';

interface Employee {
    Employee: {
        Employee_name: string; // Adjust if necessary
    };
    Emp_Id: number;
}

interface AddTaskFormProps {
    open: boolean;
    onClose: () => void;
    projectId: number;
    fetchTasks: () => void;
}

// Validation Schema using Yup
const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5); // returns HH:MM format
};

const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // returns YYYY-MM-DD format
};

const validationSchema = Yup.object({
    Task_Details: Yup.string().required('Task Details are required'),
    Start_Date: Yup.date()
        .required('Start Date is required')
        .test('is-future-date', 'Start Date cannot be in the past', function (value) {
            const now = new Date();
            const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            return value >= startOfToday; // Ensure Start Date is today or in the future
        }),
    Start_Time: Yup.string()
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format')
        .required('Start Time is required')
        .test('is-future-time', 'You cannot select a past time', function (value) {
            const { Start_Date } = this.parent;
            const now = new Date();
            const selectedTime = new Date(Start_Date);
            selectedTime.setHours(parseInt(value.split(':')[0], 10));
            selectedTime.setMinutes(parseInt(value.split(':')[1], 10));
            return selectedTime >= now; // Ensure Start Time is today or in the future
        }),
        Assigned_Emp_Id: Yup.number().required('Assigned employe is required'), // Assuming it's nullable, adjust as needed

    End_Time: Yup.string()
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format')
        .required('End Time is required')
        .test('is-end-time-valid', 'End Time must be after Start Time', function (value) {
            const { Start_Date, Start_Time, End_Date } = this.parent;

            // Convert Start and End Dates into Date objects
            const startDate = new Date(Start_Date);
            const endDate = new Date(End_Date);

            // Construct DateTime objects from input
            const startDateTime = new Date(`${startDate.toISOString().split('T')[0]}T${Start_Time}:00`);
            const endDateTime = new Date(`${endDate.toISOString().split('T')[0]}T${value}:00`);

            // Debugging logs
            console.log('Start DateTime:', startDateTime);
            console.log('End DateTime:', endDateTime);

            // Check if Start and End Dates are the same
            const isSameDay = startDate.getFullYear() === endDate.getFullYear() &&
                startDate.getMonth() === endDate.getMonth() &&
                startDate.getDate() === endDate.getDate();

            console.log('Same Day:', isSameDay);

            // Validate that End Time is greater than Start Time when dates are the same
            if (isSameDay) {
                // Compare input times directly to ensure validity
                const startHours = parseInt(Start_Time.split(':')[0], 10);
                const startMinutes = parseInt(Start_Time.split(':')[1], 10);
                const endHours = parseInt(value.split(':')[0], 10);
                const endMinutes = parseInt(value.split(':')[1], 10);

                // Create comparable time representations
                const startTotalMinutes = startHours * 60 + startMinutes;
                const endTotalMinutes = endHours * 60 + endMinutes;

                // Validate that End Time is greater than Start Time
                if (endTotalMinutes <= startTotalMinutes) {
                    return this.createError({ path: 'End_Time', message: 'End Time must be after Start Time' });
                }
                return true; // Valid end time
            }

            // If End Date is after Start Date, it's valid
            return endDate > startDate;
        }),





});

const AddTaskForm: React.FC<AddTaskFormProps> = ({ open, onClose, projectId, fetchTasks }) => {
    const formik = useFormik({
        initialValues: {
            Task_Details: '',
            Start_Date: getCurrentDate(), // Initialize with today's date
            Start_Time: getCurrentTime(), // Initialize with current time
            End_Date: getCurrentDate(), // Ensure this initializes to today as well
            End_Time: getCurrentTime(), // Initialize with current time
            Assigned_Emp_Id: null // Default to null
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const newTask = {
                Project_Id: projectId,
                Start_Date: values.Start_Date,
                Start_Time: values.Start_Time,
                Task_Details: values.Task_Details,
                End_Date: values.End_Date,
                End_Time: values.End_Time,
                Assigned_Emp_Id: values.Assigned_Emp_Id,
            };

            try {
                const response = await createTask(newTask); // Call your createTask function
                fetchTasks();
                onClose(); // Close the dialog after saving
            } catch (error) {
                console.error('Error creating task:', error);
            }
        },
    });

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await getProjectEmployees(projectId);
                setEmployees(data);
            } catch (err) {
                setError('Failed to fetch project employees.');
                console.error('Error fetching employees:', err);
            } finally {
                setLoading(false);
            }
        };

        if (open) { // Only fetch when the dialog is open
            fetchEmployees();
        }
    }, [open, projectId]); // Ensure dependency on projectId for changes

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New Task</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Task Details"
                        type="text"
                        fullWidth
                        variant="outlined"
                        name="Task_Details"
                        value={formik.values.Task_Details}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.Task_Details && Boolean(formik.errors.Task_Details)}
                        helperText={formik.touched.Task_Details && formik.errors.Task_Details}
                    />

                    <TextField
                        margin="dense"
                        label="Start Date"
                        type="date"
                        fullWidth
                        variant="outlined"
                        name="Start_Date"
                        value={formik.values.Start_Date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.Start_Date && Boolean(formik.errors.Start_Date)}
                        helperText={formik.touched.Start_Date && formik.errors.Start_Date}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            min: getCurrentDate(), // sets the minimum date to today
                        }}
                    />

                    <TextField
                        margin="dense"
                        label="Start Time"
                        type="time"
                        fullWidth
                        variant="outlined"
                        name="Start_Time"
                        value={formik.values.Start_Time}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.Start_Time && Boolean(formik.errors.Start_Time)}
                        helperText={formik.touched.Start_Time && formik.errors.Start_Time}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            min: getCurrentTime(),
                        }}
                    />

                    <TextField
                        margin="dense"
                        label="End Date"
                        type="date"
                        fullWidth
                        variant="outlined"
                        name="End_Date"
                        value={formik.values.End_Date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.End_Date && Boolean(formik.errors.End_Date)}
                        helperText={formik.touched.End_Date && formik.errors.End_Date}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            min: getCurrentDate(), // sets the minimum date to today
                        }}
                    />

                    <TextField
                        margin="dense"
                        label="End Time"
                        type="time"
                        fullWidth
                        variant="outlined"
                        name="End_Time"
                        value={formik.values.End_Time}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.End_Time && Boolean(formik.errors.End_Time)}
                        helperText={formik.touched.End_Time && formik.errors.End_Time}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    {/* Employee Assignment Dropdown */}
                    <FormControl fullWidth margin="dense" error={formik.touched.Assigned_Emp_Id && Boolean(formik.errors.Assigned_Emp_Id)}>
                        <InputLabel id="assigned-emp-id-label">Assigned Employee</InputLabel>
                        <Select
                            labelId="assigned-emp-id-label"
                            name="Assigned_Emp_Id"
                            value={formik.values.Assigned_Emp_Id || ''}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            label="Assigned Employee"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {employees.map((employee) => (
                                <MenuItem key={employee.Emp_Id} value={employee.Emp_Id}>
                                    {employee.Employee.Employee_name} {/* Assuming employee has a 'Name' field */}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>
                            {formik.touched.Assigned_Emp_Id && formik.errors.Assigned_Emp_Id ? (
                                typeof formik.errors.Assigned_Emp_Id === 'string' ? (
                                    <span>{formik.errors.Assigned_Emp_Id}</span> // Directly render the string
                                ) : Array.isArray(formik.errors.Assigned_Emp_Id) ? (
                                    <span>{formik.errors.Assigned_Emp_Id.join(', ')}</span> // Join array elements
                                ) : null // If it's not a string or an array, return null
                            ) : null}
                        </FormHelperText>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="secondary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary">
                        Add Task
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddTaskForm;
