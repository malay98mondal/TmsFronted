import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, List, ListItem, ListItemText, Typography, Card, CardContent } from '@mui/material';
import { MdAssignment, MdGroup, MdLocalHospital, MdPerson } from 'react-icons/md';
import { countAgents, countProviders, countGroups, countTasks } from '../apiRequest/user/count';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, ResponsiveContainer } from 'recharts';
import userBackgroundDashboard from '../assets/dashboardBackground.jpg';
import { TbBackground } from 'react-icons/tb';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const UserDashboards = () => {
  const [agents, setAgents] = useState(0);
  const [providers, setProviders] = useState(0);
  const [groups, setGroups] = useState(0);
  const [tasks, setTasks] = useState(0);

  const fetchAgents = async () => {
    try {
      const response = await countAgents();
      setAgents(response?.data?.count);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProviders = async () => {
    try {
      const response = await countProviders();
      setProviders(response?.data?.count);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await countGroups();
      setGroups(response?.data?.count);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await countTasks();
      setTasks(response?.data?.totalTasks);
      console.log('the tasks count:', response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAgents();
    fetchProviders();
    fetchGroups();
    fetchTasks();
  }, []);

  // Pie chart, bar chart, and line chart data based on card counts
  const data = [
    { name: 'Agents', value: agents },
    { name: 'Providers', value: providers },
    { name: 'Groups', value: groups },
    { name: 'Tasks', value: tasks },
  ];

  return (
    <Grid container>
      {/* Sidebar */}
      <Grid
        item
        md={0}
        lg={2}
        sx={{
          backgroundColor: '#1B2A49',
          display: { xs: 'block', md: 'block', lg: 'block' },
          boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '95vh',
            background: '#1B2A49',
            boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
            color:'white'
          }}
        >
          <List component="nav">
            <ListItem
              button
              component={Link}
              to="/user-dashboard/agent-table"
              sx={{ '&:hover': { backgroundColor: '#6E2EC0', color: 'white', borderRadius: '0.3em' } }}
            >
              <MdPerson style={{ marginRight: 2 }} />
              <ListItemText primary="Agents" />
            </ListItem>

            <ListItem
              button
              component={Link}
              to="/user-dashboard/groups-table"
              sx={{ '&:hover': { backgroundColor: '#6E2EC0', color: 'white', borderRadius: '0.3em' } }}
            >
              <MdGroup style={{ marginRight: 4 }} />
              <ListItemText primary="Groups" />
            </ListItem>

            <ListItem
              button
              component={Link}
              to="/user-dashboard/provider-table"
              sx={{ '&:hover': { backgroundColor: '#6E2EC0', color: 'white', borderRadius: '0.3em' } }}
            >
              <MdLocalHospital style={{ marginRight: 4 }} />
              <ListItemText primary="Providers" />
            </ListItem>

            <ListItem
              button
              component={Link}
              to="/user-dashboard/task-table"
              sx={{ '&:hover': { backgroundColor: '#6E2EC0', color: 'white', borderRadius: '0.3em' } }}
            >
              <MdAssignment style={{ marginRight: 4 }} />
              <ListItemText primary="Tasks" />
            </ListItem>
          </List>
        </Box>
      </Grid>

      {/* Main Content */}
      <Grid
        item
        xs={12}
        md={10}
        sm={6}
        lg={10}
        style={{ paddingRight: '1em', paddingLeft: '1em' }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          backgroundColor:'white'
 // Ensures the image doesn’t repeat
        }}
      >
        <Grid container spacing={4} style={{ marginTop: '2em', display: 'flex', justifyContent: 'center' }}>
          <Grid item xs={12} sm={3}>
            <Card
               sx={{
                backgroundColor: '#038d8f',
                color: 'white',
                boxShadow: 3,
                borderRadius: '12px',
                transition: '0.9s', // Smooth transition effect
                '&:hover': {
                  backgroundColor: '#005f5f', // Change background color on hover
                  color: '#f0f0f0', // Change text color
                  transform: 'scale(1.15)', // Enlarge on hover
                  transition: '0.6s', // Control transition time on hover
                  boxShadow: '0px 0px 20px 8px rgba(3, 141, 143, 0.8)', // Bubble effect with shadow
                },
                position: 'relative', // Ensures bubble effect stays within card area
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '150%',
                  height: '150%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(3,141,143,0) 80%)',
                  transition: 'opacity 0.6s ease',
                  transform: 'translate(-50%, -50%) scale(0)', // Initially scale down
                  borderRadius: '50%',
                  opacity: 0,
                },
                '&:hover::before': {
                  transform: 'translate(-50%, -50%) scale(1)', // Expand the bubble on hover
                  opacity: 1, // Make the bubble visible
                },
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  {agents} Agents
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="white">
                  Agents
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Card
              sx={{
                backgroundColor: '#038d8f',
                color: 'white',
                boxShadow: 3,
                borderRadius: '12px',
                transition: '0.9s', // Smooth transition effect
                '&:hover': {
                  backgroundColor: '#005f5f', // Change background color on hover
                  color: '#f0f0f0', // Change text color
                  transform: 'scale(1.15)', // Enlarge on hover
                  transition: '0.6s', // Control transition time on hover
                  boxShadow: '0px 0px 20px 8px rgba(3, 141, 143, 0.8)', // Bubble effect with shadow
                },
                position: 'relative', // Ensures bubble effect stays within card area
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '150%',
                  height: '150%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(3,141,143,0) 80%)',
                  transition: 'opacity 0.6s ease',
                  transform: 'translate(-50%, -50%) scale(0)', // Initially scale down
                  borderRadius: '50%',
                  opacity: 0,
                },
                '&:hover::before': {
                  transform: 'translate(-50%, -50%) scale(1)', // Expand the bubble on hover
                  opacity: 1, // Make the bubble visible
                },
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  {providers} Providers
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="white">
                  Providers
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Card
              sx={{
                backgroundColor: '#038d8f',
                color: 'white',
                boxShadow: 3,
                borderRadius: '12px',
                transition: '0.9s', // Smooth transition effect
                '&:hover': {
                  backgroundColor: '#005f5f', // Change background color on hover
                  color: '#f0f0f0', // Change text color
                  transform: 'scale(1.15)', // Enlarge on hover
                  transition: '0.6s', // Control transition time on hover
                  boxShadow: '0px 0px 20px 8px rgba(3, 141, 143, 0.8)', // Bubble effect with shadow
                },
                position: 'relative', // Ensures bubble effect stays within card area
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '150%',
                  height: '150%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(3,141,143,0) 80%)',
                  transition: 'opacity 0.6s ease',
                  transform: 'translate(-50%, -50%) scale(0)', // Initially scale down
                  borderRadius: '50%',
                  opacity: 0,
                },
                '&:hover::before': {
                  transform: 'translate(-50%, -50%) scale(1)', // Expand the bubble on hover
                  opacity: 1, // Make the bubble visible
                },
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  {tasks} Tasks
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="white">
                  Tasks
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Card
               sx={{
                backgroundColor: '#038d8f',
                color: 'white',
                boxShadow: 3,
                borderRadius: '12px',
                transition: '0.9s', // Smooth transition effect
                '&:hover': {
                  backgroundColor: '#005f5f', // Change background color on hover
                  color: '#f0f0f0', // Change text color
                  transform: 'scale(1.15)', // Enlarge on hover
                  transition: '0.6s', // Control transition time on hover
                  boxShadow: '0px 0px 20px 8px rgba(3, 141, 143, 0.8)', // Bubble effect with shadow
                },
                position: 'relative', // Ensures bubble effect stays within card area
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '150%',
                  height: '150%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(3,141,143,0) 80%)',
                  transition: 'opacity 0.6s ease',
                  transform: 'translate(-50%, -50%) scale(0)', // Initially scale down
                  borderRadius: '50%',
                  opacity: 0,
                },
                '&:hover::before': {
                  transform: 'translate(-50%, -50%) scale(1)', // Expand the bubble on hover
                  opacity: 1, // Make the bubble visible
                },
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  {groups} Groups
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="white">
                  Groups
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

          <Grid container>
              {/* Pie Chart Section */}
              <Grid item xs={12} sm={6} lg={6} style={{ marginTop: '3em', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <PieChart width={500} height={400}>
                    <Pie
                      data={data}
                      cx={200}
                      cy={200}
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend layout="vertical" align="right" verticalAlign="middle" />
                  </PieChart>
                </Box>
              </Grid>

              {/* Bar Chart Section */}
              <Grid item xs={12} sm={6} lg={6}>
              {/* Bar Chart Section */}
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 8 }}>
                <ResponsiveContainer width="95%" height={350}>
                  <BarChart data={data} barSize={30}>
                    <CartesianGrid strokeDasharray="1 1" stroke="#e0e0e0" />
                    <XAxis dataKey="name" tick={{ fill: '#8884d8', fontSize: 14 }} />
                    <YAxis tick={{ fill: '#8884d8', fontSize: 14 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#f5f5f5',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <Legend
                      wrapperStyle={{
                        top: -10,
                        right: 0,
                        textAlign: 'right',
                        fontSize: 12,
                        color: '#555',
                      }}
                    />
                    <Bar
                      dataKey="value"
                      fill="url(#colorGradient)" // Use gradient fill
                      radius={[10, 10, 0, 0]} // Rounded top corners
                      animationDuration={1200} // Slower animation for smoother effect
                      onMouseOver={(e) => e.target.style.opacity = '0.7'}
                      onMouseOut={(e) => e.target.style.opacity = '1'}
                    />
                    {/* Define Gradient */}
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.8} />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Grid>
          </Grid>


      </Grid>
    </Grid>
  );
};

export default UserDashboards;
