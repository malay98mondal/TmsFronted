import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Button,
  CssBaseline,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
  TextField,
  tableCellClasses,
  TableCell,
  styled,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { StyledToolbar } from '../SuperAdmin/styles';
import { MdDelete } from 'react-icons/md';
import { getTasksByEmployeeId } from '../../apiRequest/TaskRoutes/TaskRoutes';
import AddTaskForm from '../../components/Task/AddTask';
import DataRenderLayoutOrg from '../../layouts/dataRenderLayoutOrg';
import { importTasks } from '../../apiRequest/TaskRoutes/TaskRoutes';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import EditTaskForm from './EditTaskForm';
import { useWarningDialog } from '../../middleware/dialogService';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#f26729',
      color: 'white',
      padding: '1em 8px', // Adjust the padding as needed
  },
  [`&.${tableCellClasses.body}`]: {
      fontSize: 12, // Reduce the font size
      padding: '4px 8px', // Adjust the padding as needed
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


function TaskCreation() {
  // const empId = 1; // Set employee ID
  const [tasks, setTasks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false); // State to open/close dialog
  const [newTask, setNewTask] = useState<any>(null);
  const [projectId, setProjectId] = useState<any>(null);
  const [projectName, setProjectName] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page for pagination
  const [totalTasks, setTotalTasks] = useState<number>(0); // Total tasks count
  const [tasksPerPage] = useState<number>(5); // Number of tasks per page
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference for the hidden file input
  const [selectedTask, setSelectedTask] = useState<any>(null); // State to store the task being edited
  const [editOpen, setEditOpen] = useState(false); // For Edit Task Form
  const { showWarningDialog, DialogComponent } = useWarningDialog();



  const fetchTasks = async () => {
    try {
      const data = await getTasksByEmployeeId(searchTerm, currentPage, tasksPerPage,showWarningDialog);
      setTasks(data.tasks);
      setTotalTasks(data.total);
      setProjectId(data.projectId);
      setProjectName(data.projectName);
    } catch (err) {
      setError('Failed to fetch tasks.');
    }
  };
  useEffect(() => {

    fetchTasks();
  }, [searchTerm, currentPage, tasksPerPage,100]); // Dependencies

  // Function to handle opening the Add Task Form dialog
  const handleClickOpen = () => {
    console.log('Button clicked: Opening Add Task Form');
    setNewTask(null); // Reset any previous task selection
    setOpen(true); // Set dialog open to true
  };

  // Function to close the dialog
  const handleClose = () => {
    console.log('Closing Add Task Form');
    setOpen(false); // Close the dialog
  };

  const handleEditClick = (task: any) => {
    setSelectedTask(task); // Set the task to be edited
    setEditOpen(true); // Open Edit Task Form
  };  

  const handleEditClose = () => {
    setEditOpen(false); // Close Edit Task Form
  };

  // Handle file change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setMessage(''); // Clear any previous messages
    }
  };

  // Handle file upload
  // Handle file upload
  const handleUpload = async () => {
    if (file) {
      try {
        const response = await importTasks(projectId, file);
        setMessage(response.message); // Handle success message
        setFile(null); // Reset file state
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Reset the file input field
        }
        fetchTasks(); // Refresh task list after upload
      } catch (error: any) {
        setMessage(error.message); // Handle error message
      }
    } else {
      setMessage('Please select a file to upload.'); // Handle file selection error
    }
  };


  const handleFilePickerClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // if (error) {
  //   return <div>{error}</div>;
  // }
  const normalizeDate = (date: any) => {
    return date ? new Date(date).toISOString().split('T')[0] : '';
  };
  

  return (
    <DataRenderLayoutOrg>
      <Box sx={{ width: '100%', paddingLeft: 2, paddingRight: 2, marginTop: 1, overflow: 'auto' }}>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <StyledToolbar sx={{ marginTop: '0 em' }}>
            <Typography variant="h6" component="div" sx={{ flex: '1 1 1', color: 'black', marginLeft: '1em' }}>
              {projectName}
            </Typography>
            <Box sx={{ marginTop: 2 }}>
              <Button type="button" style={{ zIndex: '200' }} onClick={handleClickOpen}>
                Add Task
              </Button>
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                style={{ display: 'none' }} // Hide the file input
                ref={fileInputRef} // Reference to the input
              />
              <Button variant="contained" style={{ zIndex: '200' }} color="primary" onClick={handleFilePickerClick}>
                Select File
              </Button>
              <Button variant="contained" style={{ zIndex: '200' }} color="secondary" onClick={handleUpload} disabled={!file} sx={{ marginLeft: 2 }}>
                Upload Tasks
              </Button>
              {message && <p>{message}</p>} {/* Display message */}
            </Box>
            <TextField
              variant="outlined"
              placeholder="Search tasks..."
              value={searchTerm}
              size='small'
              onChange={handleSearchChange}
              sx={{ zIndex: 200 }}
            />
          </StyledToolbar>
          {/* Search Input */}

        </Box>
        <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', marginTop: '-4em', width: '100%' }}>
          <Toolbar />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>S.No</StyledTableCell>
                  <StyledTableCell align="center">Employ name</StyledTableCell>
                  <StyledTableCell align="center">Start Date</StyledTableCell>
                  <StyledTableCell align="center">Start Time</StyledTableCell>
                  <StyledTableCell align="center">Task</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks?.map((task, index) => (
                  <StyledTableRow key={task.Task_details_Id}>
                    <StyledTableCell component="th" scope="row" >
                      {index + 1 + (currentPage - 1) * tasksPerPage} {/* Adjust for pagination */}
                    </StyledTableCell>
                    <StyledTableCell align="center">{task?.Employee?.Employee_name}</StyledTableCell>
                    <StyledTableCell align="center">{normalizeDate(task?.Start_Date)}</StyledTableCell>
                    <StyledTableCell align="center">{task?.Start_Time}</StyledTableCell>
                    <StyledTableCell align="center">{task?.Task_Details}</StyledTableCell>
                    <StyledTableCell align="center">{task?.Status}</StyledTableCell>
                    <StyledTableCell style={{ textAlign: 'center' }}>
                        <Button>
                        <Tooltip title="View Details" placement="top">

                          <Link style={{ marginTop: '0.8em', marginRight: '0.8em' }} to={`/org-dashboard/task-table/task-details/${task.Task_details_Id}`} >
                            <VisibilityIcon />
                          </Link>
                          </Tooltip>
                          <Tooltip title="Edit" placement="top">
                          <EditIcon onClick={() => handleEditClick(task)} />
                          </Tooltip>
                        </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination Controls */}
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </Button>
            <Typography sx={{ margin: '0 1em' }}>
              Page {currentPage} of {Math.ceil(totalTasks / tasksPerPage)}
            </Typography>
            <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage * tasksPerPage >= totalTasks}>
              Next
            </Button>
          </Box>

          {/* Add Task Form */}
          <AddTaskForm open={open} onClose={handleClose} fetchTasks={fetchTasks} projectId={projectId} />
          {selectedTask && (
        <EditTaskForm
          open={editOpen}
          onClose={handleEditClose}
          task={selectedTask}
          projectId={projectId}
          fetchTasks={fetchTasks}
        />
      )}
        </Box>
      </Box>
      {DialogComponent} 
    </DataRenderLayoutOrg>
  );
}

export default TaskCreation;
