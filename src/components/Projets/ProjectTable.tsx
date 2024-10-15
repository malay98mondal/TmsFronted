import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, CssBaseline, IconButton, Toolbar, Tooltip } from '@mui/material';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import AddProjectForm from './AddProjectForm';
import { fetchProjects } from '../../apiRequest/ProjectRoutes/ProjectRoutes'; // Assuming this is already working
import { addProject } from '../../apiRequest/ProjectRoutes/ProjectRoutes'; // Assuming this is your API function
import DataRenderLayoutAdmin from '../../layouts/dataRenderLayoutAdmin';

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

function ProjectTable() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false); // Manage dialog open/close state
  const [error, setError] = useState<string | null>(null);
  const getProjects = async () => {
    try {
      const data = await fetchProjects();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (error: any) {
      setError("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };
  // Fetch the list of projects
  useEffect(() => {
   

    getProjects();
  }, []);

  // Handle open dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Handle close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handle form submission
  const handleFormSubmit = async (values: { projectName: string ,Status:string}) => {
    try {
      // Assuming that projectData requires both Project_Name and Status fields.
      const projectData = {
        Project_Name: values.projectName,
        Status: values.Status, 
      };

      const newProject = await addProject(projectData);
      
      getProjects();

      console.log('Project added successfully:', newProject);
    } catch (error) {
      console.error("Error adding project:", error);
    } 
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DataRenderLayoutAdmin>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', paddingLeft: 2, paddingRight: 2, marginTop: -6, overflow: 'auto' }}>
        <CssBaseline />

        {/* Button to trigger the Add Project dialog */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', zIndex: 200, marginTop: '4em', marginBottom: '-3em' }}>
          <Button variant="contained" color="primary" onClick={handleOpenDialog}>
            Add Project
          </Button>
        </Box>

        {/* Add Project Dialog */}
        <AddProjectForm open={openDialog} onClose={handleCloseDialog} onSubmit={handleFormSubmit} />

        {/* Projects Table */}
        <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', width: '100%' }}>
          <Toolbar />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Serial No</StyledTableCell>
                  <StyledTableCell align="center">Project Name</StyledTableCell>
                  <StyledTableCell align="center">Created Date</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects?.map((project, index) => (
                  <StyledTableRow key={project.Project_Id}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <Link style={{ textDecoration: 'none' }} to={`/projects/project-member/${project.Project_Id}`}>
                        {project?.Project_Name}
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align="center">{project?.createdAt}</StyledTableCell>
                    <StyledTableCell align="center">{project?.Status}</StyledTableCell>
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

export default ProjectTable;
