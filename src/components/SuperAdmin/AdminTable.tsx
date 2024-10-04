import React, { useState, useEffect, useContext } from 'react';
import {
  Table, TableBody, TableContainer, TableHead, TableRow,
  TablePagination, TableSortLabel, Paper, Typography, IconButton, Icon, InputAdornment,
  Grid, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar, Divider,
  CssBaseline,
  TableCell,
  Tooltip
} from '@mui/material';
import { StyledTableCell, StyledTableRow, SearchField, StyledToolbar, AddUserButton } from './styles';
import AddUserDialog from './AddAdminDialog';
import EditAdminDialog from './EditAdminDialog';
import { MdEdit, MdDelete, MdPeople } from "react-icons/md";
import SearchIcon from '@mui/icons-material/Search';
import Navbar from './Navbar';
import { Link, useLocation } from 'react-router-dom';
import { adminFetch, adminUpdate, adminDelete } from '../../apiRequest/Admin/admin';
import ConfirmDelete from '../user/Newforms1/ConfirmDelete';
import '../admin/shimmer.css'
import AdminContext from '../../utils/adminContext';
import DataRenderLayoutAdmin from '../../layouts/dataRenderLayoutAdmin';

interface User {
  id: number;
  user_name: string;
  first_name: string;
  last_name: string;
  full_name: string;
  ph_no: string;
  phone_ext: string;
  e_mail: string;
  active: boolean
}

const drawerWidth = 240;

const AdminTable: React.FC = () => {
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
      const response = await adminFetch(page + 1, limit, search);
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
    fetchUsers(page, rowsPerPage, searchQuery); 
  }, [page, rowsPerPage, searchQuery]);

  const handleRequestSort = (property: keyof User) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog({ open: false, id: null });
  };
  const handleCloseDialog = (shouldFetch = false) => {
    setOpenDialog(false);
    if (shouldFetch) {
      fetchUsers(page, rowsPerPage, searchQuery);
    }
  };

  const handleEditUser = (user: User) => {
    setEditDialogOpen(true);
    setEditUserInitialValues(user);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setEditUserInitialValues(null);
  };

  const handleEditSubmit = async (values: any,{ setFieldError }: any) => {
    if (editUserInitialValues) {
      try {
        const response = await adminUpdate(editUserInitialValues.id, values);
        if (response?.message) {
          if (response.message.includes('Admin updated successfully')) {

            fetchUsers(page, rowsPerPage, searchQuery); // Refresh the user list
            handleCloseEditDialog();
            setOpenNotifier(true);
            setNotifyMessage('Admin updated successfully');
            setHiderDurationNotifier(3000);
          }
        }
      } catch (error) {
      //   console.error('Error updating user:', error);
      //     // Handling backend validation errors
      // if (error.response && error.response.data && error.response.data.errors) {
      //   const { errors } = error.response.data;

      //   // Set field-specific error messages
      //   errors.forEach((err: any) => {
      //     setFieldError(err.field, err.message); // Use field name and error message from backend
      //   });
      // } else {
      //   console.error('Unexpected error:', error);
      // }
      console.log("ommmm")
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

  
  const handleConfirmDelete = async () => {
    if (openConfirmationDialog.id !== null) {
      try {
        const response = await adminDelete(openConfirmationDialog.id);
        if (response.message.includes("Admin soft deleted successfully")) {
          fetchUsers(page, rowsPerPage, searchQuery);

          setOpenNotifier(true);
          setNotifyMessage('Admin Deleted Successfully');
          setHiderDurationNotifier(3000);
        }
        
      } catch (error) {
        console.error('Error deleting DEA record:', error);
      }
      handleCloseConfirmationDialog();
    }
  };
  const handleOpenConfirmationDialog = (id: number) => {
    setOpenConfirmationDialog({ open: true, id });
  };

  const location = useLocation();
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
  // Determine if the current path matches the one for "Admin Table" or "Agent Table"
  const isAdminTableActive = location.pathname === '/super-admin-dashboard/admin-table';
  const isAgentTableActive = location.pathname === '/super-admin-dashboard/agents-table';

  return (
    <DataRenderLayoutAdmin>
    <Box sx={{ display: 'flex', width: '100%', paddingLeft: 2, paddingRight: 2, marginTop: -6, overflow: 'auto' }}>
      <CssBaseline />
     
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', width: '100%' }}>
        <Toolbar />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StyledToolbar>
              {/* <Typography variant="h6" component="div" sx={{ flex: '1 1 1', color: 'blue' }}>
                Admin
              </Typography> */}
              <AddUserButton variant="contained" color="primary" onClick={handleOpenDialog} style={{marginLeft:'0.2em'}}>
                Add New Admin
              </AddUserButton>
              <SearchField
              style={{marginRight:'-0.9px'}}
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by Username"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  sx: { height: '30px', padding: '0 10px' }
                }}
                sx={{ width: '25%' }}
              />
            </StyledToolbar>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow style={{alignItems:"center"}}>
                  <StyledTableCell>
                      S. No.
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
                        active={orderBy === 'full_name'}
                        direction={orderBy === 'full_name' ? order : 'asc'}
                        onClick={() => handleRequestSort('full_name')}
                      >
                        Full Name
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
                    <StyledTableCell style={{textAlign:"center"}}>Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                {!loading && users?.length === 0 ? (
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell colSpan={7}>
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
                        <StyledTableCell>{user.user_name}</StyledTableCell>
                        <StyledTableCell>{user.full_name}</StyledTableCell>
                        <StyledTableCell>{user.ph_no}</StyledTableCell>
                        <StyledTableCell>{user.e_mail}</StyledTableCell>
                        <StyledTableCell style={{ textAlign: 'left' }}>
                                            {user.active ? 'Active' : 'Inactive'}
                                        </StyledTableCell>
                        <StyledTableCell style={{textAlign:"center"}}>
                        <Tooltip title="Edit" placement="top">
                          <IconButton
                            onClick={() => handleEditUser(user)}
                            style={{ marginRight: '5px' }}
                          >
                            <MdEdit color='blue' />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete" placement="top">
                          <IconButton onClick={() => handleOpenConfirmationDialog(user.id)}>
                            <MdDelete color='red' />
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
            style={{marginRight:'-1em'}}
              component="div"
              count={totalItems}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
      </Box>

      <AddUserDialog open={openDialog} fetchUsers={fetchUsers} onClose={handleCloseDialog} page={page} rowsPerPage={rowsPerPage} searchQuery={searchQuery} />
      <ConfirmDelete
        open={openConfirmationDialog.open}
        title="Confirm Delete"
        content="Are you sure you want to delete this record?"
        onClose={handleCloseConfirmationDialog}
        onConfirm={handleConfirmDelete}
      />
      {editUserInitialValues && (
        <EditAdminDialog
          open={editDialogOpen}
          onClose={handleCloseEditDialog}
          initialValues={editUserInitialValues}
          onSubmit={handleEditSubmit}
        />
      )}
    </Box>
    </DataRenderLayoutAdmin>
  );
};

export default AdminTable;
