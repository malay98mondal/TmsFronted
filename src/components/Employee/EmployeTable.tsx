import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Toolbar,
  Tooltip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { MdDelete, MdEdit } from 'react-icons/md';
import { getEmployees, addEmployee } from '../../apiRequest/ProjectRoutes/ProjectRoutes';
import DataRenderLayoutAdmin from '../../layouts/dataRenderLayoutAdmin';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#f26729',
    color:'white' ,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


function EmployeeTable() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [serverError, setServerError] = useState('');

  // Fetch employee data
  const getProjects = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data.data);
    } catch (error: any) {
      console.error("Failed to fetch employees:", error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  // Form validation using Yup
  const validationSchema = Yup.object({
    employeeName: Yup.string().required('Employee name is required'),
    email: Yup.string().email('Enter a valid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  // Formik setup for handling form submission and validation
  const formik = useFormik({
    initialValues: {
      employeeName: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
        try {
          const employeeData = {
            Employee_name: values.employeeName,
            email: values.email,
            password: values.password,
          };
      
          // Attempt to add the employee
          await addEmployee(employeeData);
          getProjects(); // Refresh employee list after adding
          setOpenDialog(false); // Close dialog on success
          formik.resetForm(); // Reset form values
          setServerError(''); // Clear server error
        } catch (error: any) {
          // Log the entire error object for debugging
          console.error("Error adding employee:", error);
      
          // Improved error handling
          if (error.message) {
            const errorMessage = error.message; // Get the error message
            if (errorMessage === 'Email is already in use.') {
              setServerError('Email is already in use.'); // Display specific message
              formik.setFieldError('email', 'Email is already in use.'); // Set Formik error for email field
            } else {
              setServerError('Failed to add employee. Please try again.'); // Generic error message
            }
          } else {
            // If there's an error without a message (network error, etc.)
            setServerError('Failed to add employee. Please try again.');
          }
        }
      }
      
  });

  const onClickHandleSubmit = () => {
    formik.handleSubmit();
  };

  // Function to handle closing the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    formik.resetForm(); // Reset form values and errors when closing dialog
    setServerError(''); // Clear server error
  };

  return (
    <DataRenderLayoutAdmin>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          paddingLeft: 2,
          paddingRight: 2,
          marginTop: -6,
          overflow: 'auto',
        }}
      >
        <CssBaseline />

        {/* Button to open dialog */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            zIndex: 200,
            marginTop: '4em',
            marginBottom: '-3em',
          }}
        >
          <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
            Add Employee
          </Button>
        </Box>

        {/* Dialog for adding employee */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Add Employee</DialogTitle>
          <DialogContent>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                label="Employee Name"
                fullWidth
                margin="dense"
                id="employeeName"
                name="employeeName"
                value={formik.values.employeeName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.employeeName && Boolean(formik.errors.employeeName)}
                helperText={formik.touched.employeeName && formik.errors.employeeName}
              />
              <TextField
                label="Email"
                fullWidth
                margin="dense"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                label="Password"
                fullWidth
                margin="dense"
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              {/* Display server error message */}
              {/* {serverError && <div style={{ color: 'red' }}>{serverError}</div>} */}
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
              Cancel
            </Button>
            <Button onClick={onClickHandleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        {/* Table for displaying employees */}
        <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', width: '100%' }}>
          <Toolbar />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Serial No</StyledTableCell>
                  <StyledTableCell align="center">Employee Name</StyledTableCell>
                  <StyledTableCell align="center">Created Date</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees?.map((employee, index) => (
                  <StyledTableRow key={employee.Project_Id}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="center">{employee?.Employee_name}</StyledTableCell>
                    <StyledTableCell align="center">{employee?.createdAt}</StyledTableCell>
                    <StyledTableCell align="center">{employee?.Status}</StyledTableCell>
                    <StyledTableCell style={{ textAlign: 'center' }}>
                      <Tooltip title="Edit" placement="top">
                        <IconButton style={{ marginRight: '5px' }}>
                          <MdEdit color="blue" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete" placement="top">
                        <IconButton>
                          <MdDelete color="red" />
                        </IconButton>
                      </Tooltip>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </DataRenderLayoutAdmin>
  );
}

export default EmployeeTable;
