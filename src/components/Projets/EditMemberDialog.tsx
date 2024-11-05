import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, Autocomplete,
    FormControl, MenuItem, Select
} from '@mui/material';
import { patchProjectEmployee, getEmployees } from '../../apiRequest/ProjectRoutes/ProjectRoutes';
import { useWarningDialog } from '../../middleware/dialogService';
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';

interface Employee {
    Emp_Id: string;
    Employee_name: string;
}

interface EditMemberDialogProps {
    open: boolean;
    onClose: (shouldFetch?: boolean) => void;
    employee: any;
}

const EditMemberDialog: React.FC<EditMemberDialogProps> = ({ open, onClose, employee }) => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { showWarningDialog, DialogComponent } = useWarningDialog();
    const [designations] = useState<string[]>(['Developer', 'Tester', 'DB', 'Devops', 'BA']);

    const initialValues = {
        ProjectMember_Id: employee?.ProjectMember_Id,
        Emp_Id: employee?.Emp_Id || '',
        Employee_name: employee?.Employee_name || '',
        Role_Id: employee?.Role_Id || '',
        Degesination: employee?.Degesination || '',
    };

    const validationSchema = Yup.object().shape({
        Emp_Id: Yup.string().required('Employee is required'),
        Role_Id: Yup.string().required('Role is required'),
        Degesination: Yup.string().required('Designation is required'),
    });

    const handleSave = async (values: typeof initialValues, actions: FormikHelpers<typeof initialValues>) => {
        try {
            const response = await patchProjectEmployee(
                showWarningDialog,
                employee.Project_Id, // Assuming `Project_Id` is available in `employee` object
                values.ProjectMember_Id,
                {
                    Emp_Id: values.Emp_Id,
                    Role_Id: values.Role_Id,
                    Degesination: values.Degesination
                }
            );
    
            // If the response indicates success, close the dialog
            if (response.success) {
                onClose(true); // Indicate success to the parent
            }
        } catch (error: any) {
            console.log('Complete Error Object:', error); // Log the complete error for debugging
    
            actions.setSubmitting(false); // Reset submitting state
    
            // Check if the error has a message property directly
            if (error.message) {
                const message = error.message;
    
                if (message.includes('A team lead with the designation')) {
                    actions.setFieldError('Role_Id', message); // Set error on Role_Id for this specific case
                } else if (message.includes('Employee is already assigned to this project.')) {
                    actions.setFieldError('Emp_Id', message); // Set error on Emp_Id for this specific case
                } else {
                    // Handle other generic messages
                    actions.setFieldError('Emp_Id', message || 'An error occurred.');
                }
            } else if (error.response) {
                // If the error has a response, handle it accordingly
                const { status, data } = error.response;
    
                if (status === 409) {
                    if (data && data.message) {
                        const message = data.message;
    
                        if (message.includes('A team lead for the designation')) {
                            actions.setFieldError('Role_Id', message);
                        } else if (message.includes('Employee is already assigned to this project.')) {
                            actions.setFieldError('Emp_Id', message);
                        } else {
                            actions.setFieldError('Emp_Id', message || 'An error occurred.');
                        }
                    }
                } else {
                    // Handle other error messages sent by the backend
                    if (data && data.message) {
                        actions.setFieldError('Emp_Id', data.message || 'An error occurred.');
                    } else {
                        // Fallback for unexpected errors
                        actions.setFieldError('Emp_Id', 'An unexpected error occurred. Please try again.');
                    }
                }
            } else {
                // Handle network errors or unexpected issues
                actions.setFieldError('Emp_Id', 'Network error. Please try again.');
            }
        }
    };
    
    
    
    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const data = await getEmployees(showWarningDialog, page, searchTerm);
            setEmployees((prev) => (page === 1 ? data.data : [...prev, ...data.data]));
            setHasMore(data.data.length > 0);
        } finally {
            setLoading(false);
        }
    };
    const fetchEmployees1 = async () => {
        setLoading(true);
        try {
            const data = await getEmployees(showWarningDialog, page,employee?.Employee_name);
            setEmployees((prev) => (page === 1 ? data.data : [...prev, ...data.data]));
            setHasMore(data.data.length > 0);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
       

        if (open) {
            fetchEmployees1();
        }
    }, [open]);

    useEffect(() => {
       

       fetchEmployees()
    }, [page, searchTerm]);

    const handleScroll = (event: React.UIEvent<HTMLUListElement>) => {
        const bottom = event.currentTarget.scrollHeight === event.currentTarget.scrollTop + event.currentTarget.clientHeight;
        if (bottom && hasMore && !loading) {
            setPage((prev) => prev + 1);
        }
    };

    return (
        <Dialog open={open} onClose={() => onClose(false)} PaperProps={{ style: { width: '30em' } }}>
            <DialogTitle>Edit Member</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSave}
                    enableReinitialize
                >
                    {({ values, handleChange, handleBlur, handleSubmit, errors, touched, setFieldValue }) => (
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Autocomplete
                                        options={employees}
                                        value={employees.find((emp) => emp.Emp_Id === values.Emp_Id) || null}
                                        getOptionLabel={(option) => option.Employee_name}
                                        onInputChange={(event, newInputValue) => {
                                            setSearchTerm(newInputValue);
                                            setPage(1);
                                            if (newInputValue === '') {
                                                setSearchTerm('');
                                            }
                                        }}
                                        onChange={(event, newValue) => {
                                            setFieldValue('Emp_Id', newValue?.Emp_Id || '');
                                            setFieldValue('Employee_name', newValue?.Employee_name || '');
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Employee Name"
                                                variant="outlined"
                                                error={touched.Emp_Id && Boolean(errors.Emp_Id)}
                                                helperText={touched.Emp_Id && errors.Emp_Id ? String(errors.Emp_Id) : ''}
                                                onBlur={handleBlur}
                                            />
                                        )}
                                        ListboxProps={{
                                            onScroll: handleScroll,
                                        }}
                                        isOptionEqualToValue={(option, value) => option.Emp_Id === value.Emp_Id}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <TextField
                                            select
                                            label="Role"
                                            id="Role_Id"
                                            name="Role_Id"
                                            value={values.Role_Id}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.Role_Id && Boolean(errors.Role_Id)}
                                            helperText={touched.Role_Id && errors.Role_Id ? String(errors.Role_Id) : ''}
                                        >
                                            <MenuItem value={2}>Team Lead</MenuItem>
                                            <MenuItem value={3}>Member</MenuItem>
                                        </TextField>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <Select
                                            label="Designation"
                                            id="Degesination"
                                            name="Degesination"
                                            value={values.Degesination}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.Degesination && Boolean(errors.Degesination)}
                                        >
                                            {designations.map((designation) => (
                                                <MenuItem key={designation} value={designation}>
                                                    {designation}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <DialogActions>
                                <Button onClick={() => onClose(false)} color="secondary">Cancel</Button>
                                <Button type="submit" color="primary">Save</Button>
                            </DialogActions>
                        </form>
                    )}
                </Formik>
            </DialogContent>

            {DialogComponent}
        </Dialog>
    );
};

export default EditMemberDialog;
