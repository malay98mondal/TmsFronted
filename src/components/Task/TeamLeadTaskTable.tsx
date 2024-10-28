import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    CssBaseline,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Toolbar,
    Tooltip,
    Typography,
    Snackbar,
    TableCell,
    tableCellClasses,
    styled,
} from '@mui/material';
import { StyledToolbar } from '../SuperAdmin/styles';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { editTeamLeadOwnTask, getTeamLeadTask } from '../../apiRequest/TaskRoutes/TaskRoutes';
import DataRenderLayoutOrg from '../../layouts/dataRenderLayoutOrg';
import TeamLeadOwnTaskEdit from './TeamLeadOwnTaskEdit';
import { useWarningDialog } from '../../middleware/dialogService';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#f26729',
        color: 'white',
        padding: '1em 8px', // Adjust the padding as needed
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12, // Reduce the font size
        padding: '6px 8px', // Adjust the padding as needed
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



function TeamLeadTaskTable() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedTask, setSelectedTask] = useState<any>(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [search, setSearch] = useState('');
    const [totalTasks, setTotalTasks] = useState(0);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const { showWarningDialog, DialogComponent } = useWarningDialog();

    const fetchTasks = async () => {
        try {
            const data = await getTeamLeadTask(page, limit, search,showWarningDialog);
            console.log('API Response:', data);

            if (data.tasks && data.tasks.length > 0) {
                setTasks(data.tasks);
                setTotalTasks(data.total);
            } else {
                setTasks([]);
                setTotalTasks(0);
            }
        } catch (err) {
            setError('Failed to fetch tasks.');
            console.error('Fetch error:', err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [page, limit, search]);

    const handleClickOpenEdit = (task: any) => {
        setSelectedTask(task);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
        setSelectedTask(null);
    };

    const handleEditSubmit = async (values: any) => {
        try {
            const response = await editTeamLeadOwnTask(selectedTask.Task_details_Id, values.Status, values.Remarks, values.Actual_Start_Date, values.Actual_Start_Time,showWarningDialog);
            console.log('hello');

            if (response.message === "Task updated successfully") {
                const updatedTask = response.task;
                const updatedTasks = tasks.map((task) =>
                    task.Task_details_Id === updatedTask.Task_details_Id ? { ...task, ...updatedTask } : task
                );


                setTasks(updatedTasks);
                setSuccessMessage('Task updated successfully.');
                setSnackbarOpen(true);
                handleCloseEdit();
            }
        } catch (error) {
            console.error('Failed to update task:', error);
            setError('Failed to update task.');
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setPage(1);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    const normalizeDate = (date: any) => {
        return date ? new Date(date).toISOString().split('T')[0] : '';
    };


    return (
        <DataRenderLayoutOrg>
            <Box sx={{ width: '100%', paddingLeft: 2, paddingRight: 2, marginTop: 1, overflow: 'auto', }}>
                <CssBaseline />
                <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: '4em' }}>
                    <StyledToolbar>
                        <Typography variant="h6" component="div" sx={{ flex: '1 1 1', color: 'black', marginLeft: '1em' }}>
                            Task List
                        </Typography>
                        <TextField
                            variant="outlined"
                            placeholder="Search tasks..."
                            value={search}
                            size='small'
                            onChange={handleSearchChange}
                            sx={{ zIndex: 200 }}
                        />
                    </StyledToolbar>
                </Box>
                <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', marginTop: '-4em', width: '100%' }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead sx={{ backgroundColor: 'black' }}> {/* Set background color to black */}
                                <TableRow>
                                    <StyledTableCell sx={{ color: 'white' }}>S.No</StyledTableCell> {/* Set text color to white */}
                                    <StyledTableCell align="center" sx={{ color: 'white' }}>Task</StyledTableCell>
                                    <StyledTableCell align="center" sx={{ color: 'white' }}>Project</StyledTableCell>
                                    <StyledTableCell align="center" sx={{ color: 'white' }}>Start Time</StyledTableCell>
                                    <StyledTableCell align="center" sx={{ color: 'white' }}>End Date</StyledTableCell>
                                    <StyledTableCell align="center" sx={{ color: 'white' }}>End Time</StyledTableCell>
                                    <StyledTableCell align="center" sx={{ color: 'white' }}>Task Status</StyledTableCell>
                                    <StyledTableCell align="center" sx={{ color: 'white' }}>Actions</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tasks.length > 0 ? (
                                    tasks.map((task, index) => (
                                        <StyledTableRow key={task.Task_details_Id}>
                                            <StyledTableCell component="th" scope="row">
                                                {index + 1 + (page - 1) * limit}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{task?.Task_Details}</StyledTableCell>
                                            <StyledTableCell align="center">{task?.Project?.Project_Name}</StyledTableCell>
                                            <StyledTableCell align="center">{task?.Start_Time}</StyledTableCell>
                                            <StyledTableCell align="center">{normalizeDate(task?.End_Date)}</StyledTableCell>
                                            <StyledTableCell align="center">{task?.End_Time}</StyledTableCell>
                                            <StyledTableCell align="center">{task?.Status}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {task.Status !== 'Completed' && (  // Conditionally render the Edit button
                                                    <Tooltip title='Update status' placement='top'>
                                                        <IconButton
                                                            sx={{
                                                                zIndex: 20,
                                                                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                                            }}
                                                            onClick={() => handleClickOpenEdit(task)}
                                                        >
                                                            <EditNoteIcon sx={{ color: 'blue' }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                )}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))
                                ) : (
                                    <StyledTableRow>
                                        <StyledTableCell colSpan={7} align="center">
                                            <Typography variant="body1">No tasks found.</Typography>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                        <Typography variant="body2" component="div">
                            <Button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
                            Page {page} of {Math.ceil(totalTasks / limit)} | Total Tasks: {totalTasks}
                            <Button disabled={tasks.length < limit} onClick={() => setPage(page + 1)}>Next</Button>
                        </Typography>
                    </Box>
                </Box>
                <TeamLeadOwnTaskEdit
                    open={openEdit}
                    onClose={handleCloseEdit}
                    initialValues={selectedTask || {}}
                    onSubmit={handleEditSubmit}
                />
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    message={successMessage}
                />
            </Box>
            {DialogComponent} 
        </DataRenderLayoutOrg>
    );
}

export default TeamLeadTaskTable;
