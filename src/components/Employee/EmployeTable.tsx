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

// Styled Table Cells and Rows
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
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
  });

  // Formik setup for handling form submission and validation
  const formik = useFormik({
    initialValues: {
      employeeName: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const employeeData = {
          Employee_name: values.employeeName,
        };
        await addEmployee(employeeData);
        getProjects(); // Refresh employee list after adding
        setOpenDialog(false); // Close dialog on success
        formik.resetForm(); // Reset form values
      } catch (error) {
        console.error("Error adding employee:", error);
      }
    },
  });

  const onClickHandleSubmit = () => {
    formik.handleSubmit();
  }

  // Function to handle closing the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    formik.resetForm(); // Reset form values and errors when closing dialog
  };

  return (
    <DataRenderLayoutAdmin>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', paddingLeft: 2, paddingRight: 2, marginTop: -6, overflow: 'auto' }}>
        <CssBaseline />

        {/* Button to open dialog */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', zIndex: 200, marginTop: '4em', marginBottom: '-3em' }}>
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
                    <StyledTableCell align="center">
                      {employee?.Employee_name}
                    </StyledTableCell>
                    <StyledTableCell align="center">{employee?.createdAt}</StyledTableCell>
                    <StyledTableCell align="center">{employee?.Status}</StyledTableCell>
                    <StyledTableCell style={{ textAlign: "center" }}>
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
