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
  Typography,
} from '@mui/material';
import { MdDelete, MdEdit } from 'react-icons/md';
import {  addEmployee, getEmployees1 } from '../../apiRequest/ProjectRoutes/ProjectRoutes';
import DataRenderLayoutAdmin from '../../layouts/dataRenderLayoutAdmin';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useWarningDialog } from '../../middleware/dialogService';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#f26729',
      color: 'white',
      padding: '1em 8px', // Adjust the padding as needed
  },
  [`&.${tableCellClasses.body}`]: {
      fontSize: 12, // Reduce the font size
      padding: '8px 8px', // Adjust the padding as needed
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [search, setSearch] = useState('');
  const pageSize = 5; // Define page size
  const { showWarningDialog, DialogComponent } = useWarningDialog();

  const getProjects = async () => {
    try {
      const data = await getEmployees1(showWarningDialog,currentPage, pageSize, search);
      setEmployees(data.data);
      setTotalPages(data.totalPages);
      setTotalEmployees(data.total);
    } catch (error: any) {
      console.error("Failed to fetch employees:", error);
    }
  };

  useEffect(() => {
    getProjects();
  }, [currentPage, search]);

  const validationSchema = Yup.object({
    employeeName: Yup.string().required('Employee name is required'),
    email: Yup.string().email('Enter a valid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

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

        await addEmployee(showWarningDialog,employeeData);
        getProjects();
        setOpenDialog(false);
        formik.resetForm();
        setServerError('');
      } catch (error: any) {
        console.error("Error adding employee:", error);
        if (error.message) {
          const errorMessage = error.message;
          if (errorMessage === 'Email is already in use.') {
            setServerError('Email is already in use.');
            formik.setFieldError('email', 'Email is already in use.');
          } else {
            setServerError('Failed to add employee. Please try again.');
          }
        } else {
          setServerError('Failed to add employee. Please try again.');
        }
      }
    }
  });

  const onClickHandleSubmit = () => {
    formik.handleSubmit();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    formik.resetForm();
    setServerError('');
  };
  const normalizeDate = (date: any) => {
    return date ? new Date(date).toISOString().split('T')[0] : '';
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
          marginTop: -8,
          overflow: 'auto',
        }}
      >
        <CssBaseline />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            zIndex: 200,
            marginTop: '4em',
            marginBottom: '-3.5em',
          }}
        >
          <TextField
            label="Search Employees"
            variant="outlined"
            margin="normal"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size='small'
          />
          <Button sx={{ height: '3em', marginTop: '1.3em' }} variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
            Add Employee
          </Button>
        </Box>

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

        <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', width: '100%' }}>
          <Toolbar />

          {/* Display total employees and pagination information */}
         

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>S.No</StyledTableCell>
                  <StyledTableCell align="center">Emp Id</StyledTableCell>
                  <StyledTableCell align="center">Employee Name</StyledTableCell>
                  <StyledTableCell align="center">Created Date</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee, index) => (
                  <StyledTableRow key={employee.Emp_Id}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1 + (currentPage - 1) * pageSize}
                    </StyledTableCell>
                    <StyledTableCell align="center">{employee?.Emp_Id}</StyledTableCell>
                    <StyledTableCell align="center">{employee?.Employee_name}</StyledTableCell>
                    <StyledTableCell align="center">{normalizeDate(employee?.createdAt)}</StyledTableCell>
                    <StyledTableCell align="center">{employee?.Is_deleted ? 'Deleted' : 'Active'}</StyledTableCell>
                    <StyledTableCell style={{ textAlign: 'center' }}>
                      <Tooltip title="Edit">
                        <IconButton>
                          <MdEdit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton>
                          <MdDelete />
                        </IconButton>
                      </Tooltip>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
            <Typography variant="body2" component="div">
              {/* Previous Button */}
              <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                Previous
              </Button>

              {/* Page Information */}
              Page {currentPage} of {totalPages} | Total Employees: {totalEmployees}

              {/* Next Button */}
              <Button disabled={employees.length < pageSize || currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                Next
              </Button>
            </Typography>
          </Box>
        </Box>
      </Box>
      {DialogComponent} 
    </DataRenderLayoutAdmin>
  );
}

export default EmployeeTable;
