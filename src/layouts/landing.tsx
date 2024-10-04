import '../css/landing.css';
import { Link } from 'react-router-dom';
import { Box, Grid, List, ListItem, ListItemText, Typography, Radio } from '@mui/material';
import { MdAssignment, MdGroup, MdLocalHospital, MdPerson } from 'react-icons/md';

const Landing = () => {
  return (
    <Grid container>
      {/* Sidebar */}
      <Grid item  md={0} lg={2} sx={{
        backgroundColor: "#fff",
        display: { xs: "block", md: "block", lg: "block" },
        boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )"
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: "column",
          height: '95vh',
          background: "#D3DAE4",
          boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
          // marginTop:'-0.5em',
          '&:hover': {
          // borderRadius: '15px'
       }
        }}>
          <List component="nav">
            
            <ListItem button component={Link} to="/user-dashboard/agent-table"
              sx={{ '&:hover': { backgroundColor: '#6E2EC0', color: 'white', '&:hover': { borderRadius: '0.3em'}} 
            }}>
              <MdPerson style={{ marginRight: 2 }} />
              <ListItemText primary="Agents" />
            </ListItem>
            <ListItem button component={Link} to="/user-dashboard/groups-table"
              sx={{ '&:hover': { backgroundColor: '#6E2EC0', color: 'white','&:hover': { borderRadius: '0.3em'}} }}>
              <MdGroup style={{ marginRight: 4 }} />
              <ListItemText primary="Groups" />
            </ListItem>
            <ListItem button component={Link} to="/user-dashboard/provider-table"
              sx={{ '&:hover': { backgroundColor: '#6E2EC0', color: 'white','&:hover': { borderRadius: '0.3em'} } }}>
              <MdLocalHospital style={{ marginRight: 4 }} />
              <ListItemText primary="Providers" />
            </ListItem>
            <ListItem button component={Link} to="/user-dashboard/task-table"
              sx={{ '&:hover': { backgroundColor: '#6E2EC0', color: 'white','&:hover': { borderRadius: '0.3em'} } }}>
              <MdAssignment style={{ marginRight: 4 }} />
              <ListItemText primary="Tasks" />
            </ListItem>
            
          </List>
        </Box>
      </Grid>

      {/* Main Content */}
      <Grid item xs={6} md={10} sm={6} lg={10}>
        <div className='landing-page-container'>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            background: "rgba( 255, 255, 255, 0.25 )",
            backdropFilter: "blur( 4px )",
            // borderRadius: "10px",
            border: "1px solid rgba( 255, 255, 255, 0.18 )",
            padding: 2,
            height: '100%',
          }}>
            <Typography sx={{ fontSize: '30px', fontWeight: 'bold', color: "#000" }}>Company Name</Typography>

            {/* Your content here */}
            <ul style={{ gap: 2, listStyleType: 'none', margin: 0, padding: 0 }}>
              <Typography sx={{ fontSize: '18px', marginBottom: 2, color: '#000', marginTop: 2 }}>
                Wherever the art of medicine is loved, there is also a love of humanity. – Hippocrates
              </Typography>
              <Typography sx={{fontSize:'18px',marginBottom:2,color:'#000'}} >
        Healing is a matter of time, but it is sometimes also a matter of opportunity. – Hippocrates       
        </Typography>

        <Typography sx={{fontSize:'18px',marginBottom:2,color:'#000'}} >
        The art of medicine consists in amusing the patient while nature cures the disease. — Voltaire        
        </Typography>

        <Typography sx={{fontSize:'18px',marginBottom:2,color:'#000'}} >
        Healing is a matter of time, but it is sometimes also a matter of opportunity. – Hippocrates         
        </Typography>

        <Typography sx={{fontSize:'18px',marginBottom:2,color:'#000'}} >
        Access to quality healthcare should be equitable and accessible to all, regardless of socio-economic status.          
        </Typography>

        <Typography sx={{fontSize:'18px',marginBottom:2,color:'#000'}} >
        Healing is a matter of time, but it is sometimes also a matter of opportunity. – Hippocrates
        </Typography>

        <Typography sx={{fontSize:'18px',marginBottom:2,color:'#000'}} >
        The art of medicine consists in amusing the patient while nature cures the disease.  — Voltaire         
        </Typography>

        <Typography sx={{fontSize:'18px',marginBottom:2,color:'#000'}} >
        Credentialing ensures that healthcare providers maintain the highest standards of care and continuously improve their skills
        </Typography>
            </ul>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}

export default Landing;
