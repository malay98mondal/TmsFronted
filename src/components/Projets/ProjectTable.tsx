import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DataRenderLayoutAdmin from '../../layouts/dataRenderLayoutAdmin';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

import { CssBaseline, IconButton, Toolbar, Tooltip } from '@mui/material';
import { MdDelete, MdEdit } from 'react-icons/md';
import { index } from 'd3-array';
import { useEffect, useState } from 'react';
import { fetchProjects } from '../../apiRequest/ProjectRoutes/ProjectRoutes';

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
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}



function ProjectTable() {



  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    getProjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <DataRenderLayoutAdmin>
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
                  <StyledTableCell align="center">Created Date</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects?.map((project,index) => (
                  <StyledTableRow key={project.name}>
                    <StyledTableCell component="th" scope="row">
                      {index+1}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                    <Link style={{ textDecoration: 'none' }} to={`/projects/project-member/${project.Project_Id}`}>
                    {project?.Project_Name}
                    </Link>
                    </StyledTableCell>
                    <StyledTableCell align="center">{project?.createdAt}</StyledTableCell>
                    <StyledTableCell align="center">{project?.Status}</StyledTableCell>
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

    </DataRenderLayoutAdmin>

  );
}


export default ProjectTable