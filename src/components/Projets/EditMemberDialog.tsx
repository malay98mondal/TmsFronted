import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, Autocomplete,
    FormControl,
    MenuItem,
    FormHelperText
} from '@mui/material';
import { getEmployees } from '../../apiRequest/ProjectRoutes/ProjectRoutes';
import { useWarningDialog } from '../../middleware/dialogService';

interface Employee {
    Emp_Id: string;
    Employee_name: string;
}

interface EditMemberDialogProps {
    open: boolean;
    onClose: (shouldFetch?: boolean) => void;
    employee: any;
    onSave: (updatedEmployee: any) => void;
}

const EditMemberDialog: React.FC<EditMemberDialogProps> = ({ open, onClose, employee, onSave }) => {
    const [formData, setFormData] = useState({
        ProjectMember_Id: employee?.ProjectMember_Id,
        Emp_Id: employee?.Emp_Id || '',
        Employee_name: employee?.Employee_name || '',
        Role_Id: employee?.Role_Id || '',
        Degesination: employee?.Degesination || '',
    });
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { showWarningDialog, DialogComponent } = useWarningDialog();

    useEffect(() => {
        setFormData({
            ProjectMember_Id: employee?.ProjectMember_Id,
            Emp_Id: employee?.Emp_Id || '',
            Employee_name: employee?.Employee_name || '',
            Role_Id: employee?.Role_Id || '',
            Degesination: employee?.Degesination || '',
        });
    }, [employee]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = () => {
        onSave(formData);
    };

    useEffect(() => {
        const fetchEmployees = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getEmployees(showWarningDialog, page, searchTerm);
                setEmployees((prev) => [...prev, ...data.data]);
                setHasMore(data.data.length > 0);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, [page, searchTerm]);
    const handleScroll = (event: React.UIEvent<HTMLUListElement>) => {
        const bottom =
            event.currentTarget.scrollHeight ===
            event.currentTarget.scrollTop + event.currentTarget.clientHeight;
        if (bottom && hasMore && !loading) {
            setPage((prev) => prev + 1);
        }
    };

    return (
        <Dialog open={open} onClose={() => onClose(false)}>
            <DialogTitle>Edit Member</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Autocomplete
                            options={employees}
                            getOptionLabel={(option) => option.Employee_name}
                            onInputChange={(event, newInputValue) => {
                                setSearchTerm(newInputValue);
                                setEmployees([]); // Clear employees on new search
                                setPage(1); // Update search term for filtering
                            }}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        Emp_Id: newValue.Emp_Id,
                                        Employee_name: newValue.Employee_name,
                                    }));
                                }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Employee Name"
                                    variant="outlined"
                                />
                            )}
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
                            value={formData.Role_Id}
                            onChange={handleChange}
               
                        >
                            <MenuItem value={2}>Team Lead</MenuItem>
                            <MenuItem value={3}>Member</MenuItem>
                        </TextField>
                    </FormControl>
                </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Designation"
                            name="Degesination"
                            value={formData.Degesination}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose(false)} color="secondary">Cancel</Button>
                <Button onClick={handleSave} color="primary">Save</Button>
            </DialogActions>
            {DialogComponent}
        </Dialog>
    );
};

export default EditMemberDialog;
