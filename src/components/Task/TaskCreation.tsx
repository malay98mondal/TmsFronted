import React, { useEffect, useState } from 'react';
import { Box, Button, CssBaseline, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Toolbar, Tooltip, Typography } from '@mui/material';
import { StyledTableCell, StyledTableRow, StyledToolbar } from '../SuperAdmin/styles';
import { MdDelete } from 'react-icons/md';
import { getTasksByEmployeeId } from '../../apiRequest/TaskRoutes/TaskRoutes';
import AddTaskForm from '../../components/Task/AddTask';
import DataRenderLayoutOrg from '../../layouts/dataRenderLayoutOrg';

function TaskCreation() {
    const empId = 1;
    const [tasks, setTasks] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false); // State to open/close dialog
    const [newTask, setNewTask] = useState<any>(null);
    const [projectId,setProjectId]=useState<any>(null);
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await getTasksByEmployeeId(empId);
                setTasks(data.Tasks);
                setProjectId(data.projectId)

            } catch (err) {
                setError('Failed to fetch tasks.');
            }
        };
        fetchTasks();
    }, [empId]);



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


    if (error) {
        return <div>{error}</div>;
    }

    return (
        <DataRenderLayoutOrg>
            <Box sx={{ width: '100%', paddingLeft: 2, paddingRight: 2, marginTop: 1, overflow: 'auto' }}>
                <CssBaseline />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <StyledToolbar sx={{ marginTop: '0  em' }}>
                        <Typography variant="h6" component="div" sx={{ flex: '1 1 1', color: 'black', marginLeft: '1em' }}>
                            Task List
                        </Typography>
                        {/* Button to open Add Task Form */}
                        <Button type='button'

                        style={{zIndex:'200'}}
                            onClick={() => handleClickOpen()}>
                            Add New Task
                        </Button>
                    </StyledToolbar>
                </Box>
                <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', marginTop: '-4em', width: '100%' }}>
                    <Toolbar />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Serial No</StyledTableCell>
                                    <StyledTableCell align="center">Start Time</StyledTableCell>
                                    <StyledTableCell align="center">Task</StyledTableCell>
                                    <StyledTableCell align="center">Status</StyledTableCell>
                                    <StyledTableCell align="center">Actions</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tasks?.map((task, index) => (
                                    <StyledTableRow key={task.Task_details_Id}>
                                        <StyledTableCell component="th" scope="row">
                                            {index + 1}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{task?.Start_Time}</StyledTableCell>
                                        <StyledTableCell align="center">{task?.Task_Details}</StyledTableCell>
                                        <StyledTableCell align="center">{task?.Status}</StyledTableCell>
                                        <StyledTableCell style={{ textAlign: "center" }}>
                                            <Tooltip title="Delete" placement="top">
                                                <Button>
                                                    <MdDelete color='red' />
                                                </Button>
                                            </Tooltip>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Add Task Form */}
                    <AddTaskForm
                        open={open}  // Pass the open state
                        onClose={handleClose}
                         empId={empId}
                         projectId={projectId} // Close handler
                    />
                </Box>
            </Box>
        </DataRenderLayoutOrg>
    );
}

export default TaskCreation;
