import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableContainer, TableHead, TableRow,
    TablePagination, TableSortLabel, Paper, Typography, IconButton, Icon, InputAdornment,
    Grid, TableCell,
    Box,
    Tooltip,
    CssBaseline,
    Toolbar,
    Button,
    styled,
    tableCellClasses,
} from '@mui/material';
import AddMemberDialog from './AddMemberDialog';
import { MdEdit, MdDelete } from "react-icons/md";
import { Link, useParams } from 'react-router-dom';
import { AddUserButton, SearchField,  StyledToolbar } from '../SuperAdmin/styles';
import {  getProjectEmployees } from '../../apiRequest/ProjectRoutes/ProjectRoutes';



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

  

const ProjectMember: React.FC = () => {
   
    const [openAddDialog, setOpenAddDialog] = useState(false);

    const { id } = useParams();




    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
   
   

    const handleOpenAddDialog = () => {
        setOpenAddDialog(true);
    };

    const handleCloseAddDialog = (shouldFetch = false) => {
        setOpenAddDialog(false);
        if (shouldFetch) {
            //   fetchGroups(page, rowsPerPage, searchQuery);  //update
        }
    };


    const [employees, setEmployees] = useState<any[]>([]);
    const fetchEmployees = async () => {
        console.log('hello world')

        setLoading(true);
        setError(null);
        try {
            const data = await getProjectEmployees(Number(id));
            setEmployees(data.data); // Assuming your API response structure
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
      
        fetchEmployees();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

   

    return (
        <Box sx={{ width: 'auto', overflow: 'auto', paddingLeft: 2, paddingRight: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} padding={2}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <StyledToolbar sx={{ marginTop: '0  em' }}>
                            <Typography variant="h6" component="div" sx={{ flex: '1 1 1', color: 'black', marginLeft: '1em   ' }}>Members </Typography>
                            <Button variant="contained" color="primary" onClick={handleOpenAddDialog}  >
                                Add New Member
                            </Button>


                        </StyledToolbar>



                        <AddMemberDialog open={openAddDialog} onClose={(shouldFetch) => handleCloseAddDialog(shouldFetch)} fetchEmployees={function (): void {
                            throw new Error('Function not implemented.');
                        }} />
                    </Box>



                </Grid>
            </Grid>


            <Box sx={{ display: 'flex', width: '100%', paddingLeft: 2, paddingRight: 2, marginTop: -6, overflow: 'auto' }}>
                <CssBaseline />

                <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', width: '100%' }}>
                    <Toolbar />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Serial No</StyledTableCell>
                                    <StyledTableCell align="center">Project Name</StyledTableCell>
                                    <StyledTableCell align="center">Employee Name</StyledTableCell>
                                    <StyledTableCell align="center">Role</StyledTableCell>
                                    <StyledTableCell align="center">Actions</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employees?.map((employe, index) => (
                                    <StyledTableRow key={employe.name}>
                                        <StyledTableCell component="th" scope="row">
                                            {index + 1}
                                        </StyledTableCell>

                                        <StyledTableCell align="center">
                                                {employe?.Project_Name}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{employe?.Employee_name}</StyledTableCell>
                                        <StyledTableCell align="center">{employe?.Role_Name}</StyledTableCell>
                                        {/* Center the icons */}
                                        <StyledTableCell style={{ textAlign: "center" }}>
                                            <Tooltip title="Edit" placement="top">
                                                <IconButton style={{ marginRight: '5px' }}>
                                                    <MdEdit color='blue' />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title="Delete" placement="top">
                                                <IconButton>
                                                    <MdDelete color='red' />
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
        </Box>


    );
};

export default ProjectMember;
