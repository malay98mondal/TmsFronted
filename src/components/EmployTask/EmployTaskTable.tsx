import React, { useEffect, useState } from 'react';
import { Box, Button, CssBaseline, Icon, IconButton, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Toolbar, Tooltip, Typography } from '@mui/material';
import { StyledTableCell, StyledTableRow, StyledToolbar } from '../SuperAdmin/styles';
import { getTasksByAssignedEmployee } from '../../apiRequest/EmployeTaskApi/EmployeTaskRoute';
import AddTaskForm from '../../components/Task/AddTask';
import EditTaskForm from '../../components/EmployTask/EditTaskForm'; // Import the EditTaskForm component
import DataRenderLayoutAgent from '../../layouts/dataRenderLayoutAgent';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { updateTask } from '../../apiRequest/TaskRoutes/TaskRoutes';

function EmployTaskTable() {
    const empId = 2;
    const [tasks, setTasks] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [openAdd, setOpenAdd] = useState(false); // State to open/close Add Task dialog
    const [openEdit, setOpenEdit] = useState(false); // State to open/close Edit Task dialog
    const [selectedTask, setSelectedTask] = useState<any>(null); // Store selected task for editing

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await getTasksByAssignedEmployee(empId);
                setTasks(data);
            } catch (err) {
                setError('Failed to fetch tasks.');
            }
        };
        fetchTasks();
    }, [empId]);

    const handleClickOpenAdd = () => {
        setOpenAdd(true);
    };

    const handleCloseAdd = () => {
        setOpenAdd(false);
    };

    const handleClickOpenEdit = (task: any) => {
        setSelectedTask(task); // Set the selected task
        setOpenEdit(true);
        console.log(task)
        console.log("i am open")
        // Open the edit dialog
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
        setSelectedTask(null); // Reset the selected task
    };

    const handleEditSubmit = async (values: any) => {
        try {
            const data = await updateTask(selectedTask.Task_details_Id, values.Status, values.Remarks);

            const updatedTasks = tasks.map((task) =>
                task.Task_details_Id === selectedTask.Task_details_Id ? { ...task, ...values } : task
            );
            setTasks(updatedTasks);

            handleCloseEdit(); 
        } catch (error) {
            console.error('Failed to update task:', error);
            setError('Failed to update task.');
        }
    };


    if (error) {
        return <div>{error}</div>;
    }

    return (
        <DataRenderLayoutAgent>
            <Box sx={{ width: '100%', paddingLeft: 2, paddingRight: 2, marginTop: 1, overflow: 'auto' }}>
                <CssBaseline />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <StyledToolbar>
                        <Typography variant="h6" component="div" sx={{ flex: '1 1 1', color: 'black', marginLeft: '1em' }}>
                            Task List
                        </Typography>
                        <Button type='button' onClick={handleClickOpenAdd}>
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
                                    <StyledTableCell align="center">Task</StyledTableCell>
                                    <StyledTableCell align="center">Start Time</StyledTableCell>
                                    <StyledTableCell align="center">End Date</StyledTableCell>
                                    <StyledTableCell align="center">End Time</StyledTableCell>
                                    <StyledTableCell align="center">Task Status</StyledTableCell>
                                    <StyledTableCell align="center">Actions</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tasks?.map((task, index) => (
                                    <StyledTableRow key={task.Task_details_Id}>
                                        <StyledTableCell component="th" scope="row">
                                            {index + 1}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{task?.Task_Details}</StyledTableCell>
                                        <StyledTableCell align="center">{task?.Start_Time}</StyledTableCell>
                                        <StyledTableCell align="center">{task?.End_Date}</StyledTableCell>
                                        <StyledTableCell style={{ textAlign: "center" }}>
                                            {task?.End_Time}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{task?.Status}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Tooltip title='Update status' placement='top'>
                                                <IconButton
                                                    sx={{
                                                        zIndex: 20,
                                                        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Add a semi-transparent background to see it better
                                                    }}
                                                    onClick={() => handleClickOpenEdit(task)}
                                                >
                                                    <EditNoteIcon sx={{ color: 'blue' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>


                    <EditTaskForm
                        open={openEdit}
                        onClose={handleCloseEdit}
                        initialValues={selectedTask || {}} // Pass selected task details
                        onSubmit={handleEditSubmit}
                    />
                </Box>
            </Box>
        </DataRenderLayoutAgent>
    );
}

export default EmployTaskTable;
