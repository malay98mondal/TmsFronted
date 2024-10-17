import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createTask, getProjectEmployees } from '../../apiRequest/TaskRoutes/TaskRoutes';

interface Employee {
    Employee: any;
    Emp_Id: number;
    Name: string;
    Employee_name: string;
}

interface AddTaskFormProps {
    open: boolean;
    onClose: () => void;
    projectId: number;
}

// Validation Schema using Yup
const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5); // returns HH:MM format
};

const validationSchema = Yup.object({
    Task_Details: Yup.string().required('Task Details are required'),
    End_Time: Yup.string().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format').required('End time is required'),
    Start_Time: Yup.string()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format') // Time format validation
    .required('Start time is required')
    .test('is-future-time', 'You cannot select a past time', function (value) {
      const currentTime = getCurrentTime();
      return value >= currentTime; // Custom validation to ensure the selected time is not in the past
    }),
    End_Date: Yup.date().required('End Date is required'),
    Assigned_Emp_Id: Yup.number().required('Assigned employe is required'), // Assuming it's nullable, adjust as needed
});

const AddTaskForm: React.FC<AddTaskFormProps> = ({ open, onClose, projectId }) => {
    const formik = useFormik({
        initialValues: {
            Task_Details: '',
            Start_Time: '',
            End_Date: new Date().toISOString().split('T')[0],
            End_Time: '',
            Assigned_Emp_Id: null // Default to null
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const newTask = {
                Project_Id: projectId,
                Start_Time: values.Start_Time,
                Task_Details: values.Task_Details,
                End_Date: values.End_Date,
                End_Time: values.End_Time,
                Assigned_Emp_Id: values.Assigned_Emp_Id,
            };

            try {
                const response = await createTask(newTask); // Call your createTask function
                console.log('Task created successfully: ', response);
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
                console.log('Employ name', employees)
            } catch (err) {
                setError('Failed to fetch project employees.');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, [open]);

    const getCurrentDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0]; // returns YYYY-MM-DD format
    };
   


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


                    {/* Assigned Employee ID Dropdown */}
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
                        {/* <FormHelperText>{formik.touched.Assigned_Emp_Id && formik.errors.Assigned_Emp_Id}</FormHelperText> */}
                    </FormControl>

                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose} color="secondary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddTaskForm;
