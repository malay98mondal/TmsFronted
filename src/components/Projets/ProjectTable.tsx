import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, CssBaseline, IconButton, Toolbar, Tooltip, TextField, Pagination, Typography } from '@mui/material';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import AddProjectForm from './AddProjectForm';
import { fetchProjects, addProject } from '../../apiRequest/ProjectRoutes/ProjectRoutes';
import DataRenderLayoutAdmin from '../../layouts/dataRenderLayoutAdmin';
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

function ProjectTable() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false); // Manage dialog open/close state
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(''); // For searching projects
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const { showWarningDialog, DialogComponent } = useWarningDialog();

  const getProjects = async (page = 1, search = '') => {
    setLoading(true);
    try {
      const data = await fetchProjects(showWarningDialog,page, pageSize, search);
      if (data.success) {
        setProjects(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error: any) {
      setError("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  // Fetch projects when the component loads or when page/search changes
  useEffect(() => {
    getProjects(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  // Handle form submission
  const handleFormSubmit = async (values: { projectName: string, Status: string }) => {
    try {
      const projectData = {
        Project_Name: values.projectName,
        Status: values.Status,
      };

      const newProject = await addProject(showWarningDialog,projectData);
      getProjects(currentPage, searchTerm); // Fetch projects again after adding new project
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 when searching
  };

  // Handle page change (from pagination component)
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
  const normalizeDate = (date: any) => {
    return date ? new Date(date).toISOString().split('T')[0] : '';
};


  return (
    <DataRenderLayoutAdmin>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', paddingLeft: 2, paddingRight: 2, marginTop: -6, overflow: 'auto' }}>
        <CssBaseline />

        {/* Button to trigger the Add Project dialog */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', zIndex: 200, marginTop: '4em', marginBottom: '-3em' }}>
          <TextField
            label="Search Projects"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            size="small"
          />
          <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
            Add Project
          </Button>
        </Box>

        {/* Add Project Dialog */}
        <AddProjectForm open={openDialog} onClose={() => setOpenDialog(false)} onSubmit={handleFormSubmit} />

        {/* Projects Table */}
        <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', width: '100%' }}>
          <Toolbar />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>S.No</StyledTableCell>
                  <StyledTableCell align="center">Project Name</StyledTableCell>
                  <StyledTableCell align="center">Created Date</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.length > 0 ? (
                  projects.map((project, index) => (
                    <StyledTableRow key={project.Project_Id}>
                      <StyledTableCell component="th" scope="row">
                        {index + 1}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <Link style={{ textDecoration: 'none' }} to={`/projects/project-member/${project.Project_Id}`}>
                          {project?.Project_Name}
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell align="center">{normalizeDate(project?.createdAt)}</StyledTableCell>
                      <StyledTableCell align="center">{project?.Status}</StyledTableCell>
                      <StyledTableCell align="center">
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
                  ))
                ) : (
                  <StyledTableRow>
                    <StyledTableCell colSpan={5} align="center">
                      <Typography variant="body1" color="textSecondary">
                        No projects found
                      </Typography>
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination Component */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
            <Typography variant="body2" component="div">
              {/* Previous Button */}
              <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                Previous
              </Button>

              {/* Page Information */}
              Page {currentPage} of {totalPages} | Total Projects: {projects.length}

              {/* Next Button */}
              <Button disabled={projects.length < pageSize || currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
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

export default ProjectTable;
