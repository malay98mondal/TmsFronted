import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    TextField,
    Button,
    Box,
    Grid,
    FormControl,
    FormHelperText,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete'; // Import Autocomplete
import { useParams } from 'react-router-dom';
import { addOrUpdateProjectEmployee, getEmployees } from '../../apiRequest/ProjectRoutes/ProjectRoutes';

interface FormValues {
    Emp_Id: number | null; 
    Role_Id: number | null; 
    Degesination: string; 
}

const AddMemberForm = (props: any) => {
    const { fetchEmployees, onClose } = props;
    const { id } = useParams();

    const formik = useFormik<FormValues>({
        initialValues: {
            Emp_Id: null,
            Role_Id: null,
            Degesination: '', 
        },
        validationSchema: Yup.object({
            Emp_Id: Yup.number().required('Employee is required'),
            Role_Id: Yup.number().required('Role is required'),
            Degesination: Yup.string().required('Designation is required'), 
        }),
        onSubmit: async (values) => {
            try {
                const { Emp_Id, Role_Id, Degesination } = values; 
                const response = await addOrUpdateProjectEmployee(Number(id), Number(Emp_Id), Number(Role_Id), Degesination);
                console.log(response);
                if (response && response.success) {
                    console.log('Success:', response.message);
                    fetchEmployees();
                    onClose();
                } else {
                    formik.setFieldError('Emp_Id', response.message || 'Unexpected response format. Please try again.');
                }
            } catch (error: any) {
                console.error('Complete Error Object:', error);  
                // Error handling logic here...
            }
        }
    });

    const [employees, setEmployees] = useState<any[]>([]);
    const [designations, setDesignations] = useState<string[]>(['Developer', 'Tester','DB','Devops','BA']); 
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const fetchEmployees = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getEmployees(page, searchTerm); // Fetch based on search term
                setEmployees((prev) => [...prev, ...data.data]); 
                setHasMore(data.data.length > 0);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, [page, searchTerm]); // Fetch employees when page or searchTerm changes

    // Infinite scroll handler
    const handleScroll = (event: React.UIEvent<HTMLUListElement>) => {
        const bottom =
            event.currentTarget.scrollHeight ===
            event.currentTarget.scrollTop + event.currentTarget.clientHeight;
        if (bottom && hasMore && !loading) {
            setPage((prev) => prev + 1);
        }
    };


    return (
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '30em' }}>
            <Grid container xs={12} spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        options={employees}
                        getOptionLabel={(option) => option.Employee_name}
                        onChange={(event, value) => {
                            formik.setFieldValue('Emp_Id', value ? value.Emp_Id : null);
                        }}
                        onBlur={formik.handleBlur}
                        onInputChange={(event, value) => {
                            setSearchTerm(value); // Update search term on input change
                            setEmployees([]); // Clear employees on new search
                            setPage(1); // Reset page for new search
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Employee"
                                variant="outlined"
                                error={formik.touched.Emp_Id && Boolean(formik.errors.Emp_Id)}
                                helperText={formik.touched.Emp_Id && formik.errors.Emp_Id}
                            />
                        )}
                        loading={loading}
                        noOptionsText={loading ? 'Loading...' : 'No options'}
                        ListboxProps={{
                            onScroll: handleScroll, // Handle scroll for infinite loading
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                        <TextField
                            select
                            label="Role"
                            id="Role_Id" 
                            name="Role_Id" 
                            value={formik.values.Role_Id || ''} 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.Role_Id && Boolean(formik.errors.Role_Id)}
                        >
                            <option value={2}>Team Lead</option>
                            <option value={3}>Member</option>
                        </TextField>
                        <FormHelperText error={formik.touched.Role_Id && Boolean(formik.errors.Role_Id)}>
                            {formik.touched.Role_Id && formik.errors.Role_Id}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth size="small">
                        <TextField
                            select
                            label="Designation"
                            id="Degesination" 
                            name="Degesination" 
                            value={formik.values.Degesination || ''} 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.Degesination && Boolean(formik.errors.Degesination)}
                        >
                            {designations.map((designation, index) => (
                                <option key={index} value={designation}>
                                    {designation}
                                </option>
                            ))}
                        </TextField>
                        {formik.touched.Degesination && formik.errors.Degesination && (
                            <FormHelperText error>{formik.errors.Degesination}</FormHelperText>
                        )}
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
