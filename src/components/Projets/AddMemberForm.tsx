import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Grid, InputLabel, FormControl, Select, MenuItem, FormHelperText } from '@mui/material';
import { useParams } from 'react-router-dom';
import { addOrUpdateProjectEmployee, getEmployees } from '../../apiRequest/ProjectRoutes/ProjectRoutes';

interface FormValues {
    Emp_Id: number | null; // Make Emp_Id nullable
    Role_Id: number | null; // Make Role_Id nullable
}

const AddMemberForm = (props: any) => {
    const { fetchEmployees, onClose } = props;
    const { id } = useParams();

    const formik = useFormik<FormValues>({
        initialValues: {
            Emp_Id: null,
            Role_Id: null,
        },
        validationSchema: Yup.object({
            Emp_Id: Yup.number().required('Employee is required'),
            Role_Id: Yup.number().required('Role is required'),
        }),
        onSubmit: async (values) => {
            try {
                const { Emp_Id, Role_Id } = values;
                const response = await addOrUpdateProjectEmployee(Number(id), Number(Emp_Id), Number(Role_Id));
                console.log('Success:', response);
                fetchEmployees()
                onClose()
            } catch (error: any) {
                console.error('Complete Error Object:', error);  // Log the complete error for debugging

                // Check for a specific status code like 409
                if (error.status === 409) {
                    // Handle "Employee is already assigned to this project" error
                    formik.setFieldError('Emp_Id', 'This employee is already assigned to the project.');
                }
                // Handle other error messages sent by the backend
                else if (error.data && error.data.message) {
                    formik.setFieldError('Emp_Id', error.data.message || 'An error occurred.');
                } else {
                    // Fallback for unexpected errors
                    formik.setFieldError('Emp_Id', 'An unexpected error occurred. Please try again.');
                }
            }
        }





    });

    const [employees, setEmployees] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getEmployees();
                setEmployees(data.data); // Assuming your API response structure
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '30em' }}>
            <Grid container xs={12} spacing={2}>
            <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
                        <InputLabel id="employee-select-label">Select Employee</InputLabel>
                        <Select
                            labelId="employee-select-label"
                            id="Emp_Id" // Bind the select to Emp_Id
                            name="Emp_Id" // Use Emp_Id as the name
                            value={formik.values.Emp_Id || ''} // Set the value from formik
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.Emp_Id && Boolean(formik.errors.Emp_Id)} // Display error
                        >
                            {loading ? (
                                <MenuItem disabled>Loading employees...</MenuItem>
                            ) : error ? (
                                <MenuItem disabled>Error fetching employees</MenuItem>
                            ) : (
                                employees.map((employee) => (
                                    <MenuItem key={employee.Emp_Id} value={employee.Emp_Id}>
                                        {employee.Employee_name}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                        {formik.touched.Emp_Id && formik.errors.Emp_Id && (
                            <FormHelperText error>{formik.errors.Emp_Id}</FormHelperText>
                        )}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="role-select-label">Role</InputLabel>
                        <Select
                            labelId="role-select-label"
                            id="Role_Id" // Bind the select to Role_Id
                            name="Role_Id" // Use Role_Id as the name
                            value={formik.values.Role_Id || ''} // Set the value from formik
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.Role_Id && Boolean(formik.errors.Role_Id)}
                        >
                            <MenuItem value={2}>Team Lead</MenuItem> {/* Value for Team Lead */}
                            <MenuItem value={3}>Member</MenuItem> {/* Value for Member */}
                        </Select>
                        <FormHelperText error={formik.touched.Role_Id && Boolean(formik.errors.Role_Id)}>
                            {formik.touched.Role_Id && formik.errors.Role_Id}
                        </FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <Button color="primary" variant="contained" type="submit">
                        Register
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AddMemberForm;
