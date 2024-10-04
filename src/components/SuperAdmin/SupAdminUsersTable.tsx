import React, { useState, useEffect, useContext } from 'react';
import {
    Table, TableBody, TableContainer, TableHead, TableRow,
    TablePagination, TableSortLabel, Paper, Typography, IconButton, Icon, InputAdornment,
    Grid,
    Box,
    TableCell,
    Tooltip,
} from '@mui/material';
import { StyledTableCell, StyledTableRow, SearchField, StyledToolbar, AddUserButton } from './styles';
import AddUserDialog from './AddUserDialog';
import EditUserDialog from './EditUserDialog';
import { MdEdit, MdDelete } from "react-icons/md";
import SearchIcon from '@mui/icons-material/Search';
import { getAllUsers, userDelete, userUpdate } from '../../apiRequest/Admin/users';
import DataRenderLayoutAdmin from '../../layouts/dataRenderLayoutAdmin';
import ConfirmDelete from '../user/Newforms1/ConfirmDelete';
import '../admin/shimmer.css'
import AdminContext from '../../utils/adminContext';


interface User {
    id: number;
    user_name: string;
    first_name: string;
    last_name: string;
    full_name: string;
    ph_no: string;
    phone_ext: string;
    e_mail: string;
    active: boolean;
}

const SupAdminUsersTable = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<keyof User>('user_name');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editUserInitialValues, setEditUserInitialValues] = useState<User | null>(null);
    const [totalItems, setTotalItems] = useState(0);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState<{ open: boolean; id: number | null }>({
        open: false,
        id: null
    })
    const { setOpenNotifier, setNotifyMessage, setHiderDurationNotifier } = useContext(AdminContext);

    const [loading, setLoading] = useState(true);
    const fetchUsers = async (page: number, limit: number, search: string) => {
        setLoading(true);
        try {
            const response = await getAllUsers(page + 1, limit, search);
            console.log(response);
            const fetchedUsers = response?.data?.map((user: any) => ({
                ...user,
                full_name: `${user.first_name} ${user.last_name}`,
            }));
            setUsers(fetchedUsers);
            setTotalItems(response?.totalItems || 0);
        } catch (error) {
            console.error('Error fetching data: ', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchUsers(page, rowsPerPage, searchQuery);
        };

        fetchData();
    }, [page, rowsPerPage, searchQuery]);

    const handleRequestSort = (property: keyof User) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSearchChange = (event: any) => {
        setSearchQuery(event.target.value);
        setPage(0); // Reset to first page on search
    };

    const handleChangePage = (event: any | null, newPage: number) => {
        console.log(event);
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const sortedUsers = users?.sort((a, b) => {
        if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
        if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
        return 0;
    });

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = (shouldFetch = false) => {
        setOpenDialog(false);
        if (shouldFetch) {
            fetchUsers(page, rowsPerPage, searchQuery);
        }
    };
    const handleOpenConfirmationDialog = (id: number) => {
        setOpenConfirmationDialog({ open: true, id });
    };
    const handleCloseConfirmationDialog = () => {
        setOpenConfirmationDialog({ open: false, id: null });
    };
    const handleEditUser = (user: User) => {
        setEditDialogOpen(true);
        setEditUserInitialValues(user);
    };

    const handleCloseEditDialog = () => {
        setEditDialogOpen(false);
        setEditUserInitialValues(null);
    };

    const handleEditSubmit = async (values: any, { setFieldError }: any) => {
        if (editUserInitialValues) {
            try {
                const response = await userUpdate(editUserInitialValues.id, values);
                if (response?.message) {
                    if (response.message.includes('User updated successfully')) {
                        fetchUsers(page, rowsPerPage, searchQuery);
                        handleCloseEditDialog();
                        setOpenNotifier(true);
                        setNotifyMessage('User updated successfully');
                        setHiderDurationNotifier(3000);
                    }
                }
            } catch (error) {
                // console.log('Error updating user:', error);
                if (Array.isArray(error)) {
                    error.forEach((err: { field: string, message: string }) => {
                        setFieldError(err.field, err.message);
                    });
                } else {
                    // Handle other error messages (generic errors)
                    if (error.message) {
                        console.log('Server error:', error.message);
                    }
                }
            }
        }
    };

    // const handleDeleteUser = async (id: number) => {
    //     // Show confirmation dialog
    //     const isConfirmed = window.confirm('Are you sure you want to delete this user?');

    //     if (isConfirmed) {
    //         try {
    //             await userDelete(id);
    //             fetchUsers(page, rowsPerPage, searchQuery);
    //         } catch (error) {
    //             console.error('Error deleting user:', error);
    //         }
    //     }
    // };
    const handleConfirmDelete = async () => {
        if (openConfirmationDialog.id !== null) {
            try {
                const response = await userDelete(openConfirmationDialog.id);
                if (response.message.includes("User soft deleted successfully")) {
                    fetchUsers(page, rowsPerPage, searchQuery);

                    setOpenNotifier(true);
                    setNotifyMessage('User deleted successfully');
                    setHiderDurationNotifier(3000);
                }

            } catch (error) {
                console.error('Error deleting DEA record:', error);
            }
            handleCloseConfirmationDialog();
        }
    };
    const handleFetchUsersWrapper = () => {
        fetchUsers(page, rowsPerPage, searchQuery);
    };
    const ShimmerTable = () => (
        <TableContainer sx={{ width: '100%', marginTop: '20px' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="left"><div className="shimmer shimmer-cell"></div></TableCell>
                        <TableCell align="left"><div className="shimmer shimmer-cell"></div></TableCell>
                        <TableCell align="left"><div className="shimmer shimmer-cell"></div></TableCell>
                        <TableCell align="right"><div className="shimmer shimmer-cell"></div></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell align="left"><div className="shimmer shimmer-cell"></div></TableCell>
                            <TableCell align="left"><div className="shimmer shimmer-cell"></div></TableCell>
                            <TableCell align="left"><div className="shimmer shimmer-cell"></div></TableCell>
                            <TableCell align="right"><div className="shimmer shimmer-cell"></div></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
    return (
        <DataRenderLayoutAdmin>
            <Grid item xs={12} padding={2}>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

                    <StyledToolbar sx={{ marginTop: '0.4em' }}>
                        {/* <Typography variant="h6" component="div" sx={{ flex: '1 1 1', color: 'black' }}>
                            User
                        </Typography> */}
                        <AddUserButton variant="contained" color="primary" onClick={handleOpenDialog} sx={{ marginLeft: '0.2em' }}>
                            Add New User
                        </AddUserButton>
                        <SearchField
                            style={{ marginRight: '-0.9px' }}
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search by Name,Username"
                            sx={{ width: '28%' }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                                sx: { height: '30px', padding: '0 10px' }
                            }}

                        />
                    </StyledToolbar>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>

                                <TableRow>
                                    <StyledTableCell>
                                        S. No.
                                    </StyledTableCell>
                                    <StyledTableCell>

                                        <TableSortLabel
                                            active={orderBy === 'full_name'}
                                            direction={orderBy === 'full_name' ? order : 'asc'}
                                            onClick={() => handleRequestSort('full_name')}
                                        >
                                            Full Name
                                        </TableSortLabel>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <TableSortLabel
                                            active={orderBy === 'user_name'}
                                            direction={orderBy === 'user_name' ? order : 'asc'}
                                            onClick={() => handleRequestSort('user_name')}
                                        >
                                            Username
                                        </TableSortLabel>
                                    </StyledTableCell>

                                    <StyledTableCell>
                                        <TableSortLabel
                                            active={orderBy === 'ph_no'}
                                            direction={orderBy === 'ph_no' ? order : 'asc'}
                                            onClick={() => handleRequestSort('ph_no')}
                                        >
                                            Phone Number
                                        </TableSortLabel>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <TableSortLabel
                                            active={orderBy === 'e_mail'}
                                            direction={orderBy === 'e_mail' ? order : 'asc'}
                                            onClick={() => handleRequestSort('e_mail')}
                                        >
                                            Email
                                        </TableSortLabel>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <TableSortLabel
                                            active={orderBy === 'active'}
                                            direction={orderBy === 'active' ? order : 'asc'}
                                            onClick={() => handleRequestSort('active')}
                                        >
                                            Status
                                        </TableSortLabel>
                                    </StyledTableCell>
                                    <StyledTableCell style={{ textAlign: 'center' }}>
                                        Actions
                                    </StyledTableCell>
                                </TableRow>

                            </TableHead>

                            {!loading && users?.length === 0 ? (
                                <TableBody>
                                    <StyledTableRow>
                                        <StyledTableCell colSpan={5}>
                                            <Typography variant="h6" align="center">
                                                No data available
                                            </Typography>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                </TableBody>
                            ) : (
                                <TableBody>
                                    {sortedUsers?.map((user, index) => (
                                        <StyledTableRow key={user.id}>
                                            <StyledTableCell>{page * rowsPerPage + index + 1}</StyledTableCell>
                                            <StyledTableCell>{user.full_name}</StyledTableCell>
                                            <StyledTableCell>{user.user_name}</StyledTableCell>

                                            <StyledTableCell>{user.ph_no}</StyledTableCell>
                                            <StyledTableCell >{user.e_mail}</StyledTableCell>
                                            <StyledTableCell >
                                                {user.active ? 'Active' : 'Inactive'}
                                            </StyledTableCell>
                                            <StyledTableCell style={{ textAlign: 'center' }}>
                                                <Tooltip title="Edit User" placement='top'>
                                                    <IconButton onClick={() => handleEditUser(user)}>
                                                        <Icon sx={{ color: 'blue' }}><MdEdit /></Icon>
                                                    </IconButton>
                                                </Tooltip>

                                                <Tooltip title="Delete User" placement='top'>
                                                    <IconButton onClick={() => handleOpenConfirmationDialog(user.id)}>
                                                        <Icon sx={{ color: 'red' }}><MdDelete /></Icon>
                                                    </IconButton>
                                                </Tooltip>
                                            </StyledTableCell>

                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            )}
                        </Table>
                        {loading && <ShimmerTable />}
                    </TableContainer>

                    <TablePagination
                        style={{ marginRight: '-1em' }}
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={totalItems}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    <AddUserDialog
                        fetchUsers={handleFetchUsersWrapper}
                        open={openDialog}
                        onClose={handleCloseDialog}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        searchQuery={searchQuery}
                    />
                    <ConfirmDelete
                        open={openConfirmationDialog.open}
                        title="Confirm Delete"
                        content="Are you sure you want to delete this record?"
                        onClose={handleCloseConfirmationDialog}
                        onConfirm={handleConfirmDelete}
                    />
                    {editUserInitialValues && (
                        <EditUserDialog
                            open={editDialogOpen}
                            onClose={handleCloseEditDialog}
                            initialValues={editUserInitialValues}
                            onSubmit={handleEditSubmit}
                        />
                    )}
                </Box>
            </Grid>
        </DataRenderLayoutAdmin>
    );
};

export default SupAdminUsersTable;
