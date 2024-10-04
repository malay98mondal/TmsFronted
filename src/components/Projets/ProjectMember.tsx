import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableContainer, TableHead, TableRow,
  TablePagination, TableSortLabel, Paper, Typography, IconButton, Icon, InputAdornment,
  Grid, TableCell,
  Box,
  Tooltip,
} from '@mui/material';
import AddMemberDialog from './AddMemberDialog';
import { MdEdit, MdDelete } from "react-icons/md";
import SearchIcon from '@mui/icons-material/Search';
import { Link, useParams } from 'react-router-dom';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { AddUserButton, SearchField, StyledToolbar } from '../SuperAdmin/styles';

interface Group {
  group_id: number;
  legal_entity_name: string;
  tax_id: string;
  doing_business_as: string;
  group_npi: string;
  other_names: string;
  status: boolean;
}

const ProjectMember: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof Group>('legal_entity_name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editUserInitialValues, setEditUserInitialValues] = useState<Group | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState<{ open: boolean; id: number | null }>({
    open: false,
    id: null
  });
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

 const handleAddGroup = (newGroup: Group) => {
    setGroups((prevGroups) => [...prevGroups, { ...newGroup, group_id: prevGroups.length + 1 }]);
  };




  const filteredGroups = groups?.filter(
    (group) =>
      group.legal_entity_name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      group.tax_id?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const sortedGroups = filteredGroups?.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
    return 0;
  });

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = (shouldFetch = false) => {
    setOpenAddDialog(false);
    if (shouldFetch) {
    //   fetchGroups(page, rowsPerPage, searchQuery);  //update
    }
  };



  const handleEditGroup = (group: Group) => {
    setEditDialogOpen(true);
    setEditUserInitialValues(group);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setEditUserInitialValues(null);
  };

  

  // const handleOpenEditDialog = (group: Group) => {
  //     setOpenEditDialog({ open: true, rowData: group });
  // };

  // const handleCloseEditDialog = () => {
  //     setOpenEditDialog({ open: false, rowData: null });
  // };
  const handleOpenConfirmationDialog = (id: number) => {
    setOpenConfirmationDialog({ open: true, id });
  };

  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog({ open: false, id: null });
  };



  return (
    <Box sx={{width: 'auto', overflow: 'auto', paddingLeft:2, paddingRight: 2}}>
      <Grid container spacing={2}>
        <Grid item xs={12} padding={2}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <StyledToolbar sx={{ marginTop: '0  em' }}>
              <Typography variant="h6" component="div" sx={{ flex: '1 1 1', color: 'black' }}>
                Groups
              </Typography>

              <AddUserButton variant="contained" color="primary" onClick={handleOpenAddDialog} >
                Add New Group
              </AddUserButton>
              <SearchField
              style={{marginRight:'-1px'}}
                value={searchQuery}
                placeholder="Search Group name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  sx: { height: '30px', padding: '0 10px' }
                }}
                sx={{ width: '23%' }}
              />

            </StyledToolbar>

            
           
            <AddMemberDialog open={openAddDialog} onClose={(shouldFetch) => handleCloseAddDialog(shouldFetch)} onAdd={handleAddGroup} fetchGroups={function (): void {
              throw new Error('Function not implemented.');
            }} />
          </Box>
        </Grid>
      </Grid>
    </Box>


  );
};

export default ProjectMember;
