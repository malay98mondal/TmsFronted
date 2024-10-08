import './App.css';
import React, { useState, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import AdminLayout from './layouts/adminLayout';
import OrganizationLayout from './layouts/organizationLayout';
import OrganizationUserLayout from './layouts/organizationUserLayout';
import DataRenderLayoutUser from './layouts/dataRenderLayoutUser';
import OrganizationProviderLayout from './layouts/organizationProviderLayout';
import OrganizationAgentLayout from './layouts/organizationAgentLayout';
import Hello from './components/Hello';
import ProjectTable from './components/Projets/ProjectTable';
// import ProjectMember from './components/Projets/ProjectMember';

const Sidenav = React.lazy(() => import('./layouts/sideNav'));
const Navbar = React.lazy(() => import('./layouts/navAdmin'));
const Landing = React.lazy(() => import('./layouts/UserDashboards'));
const ProjectMember = React.lazy(() => import('./components/Projets/ProjectMember'));
const TaskCreation = React.lazy(() => import('./components/Task/TaskCreation'));

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const router = createBrowserRouter([
    {
      path: 'projects',
      element: (
        <Suspense
          fallback={
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              width="100%"
              padding="2em"
            >
              <CircularProgress />
            </Box>
          }
        >
          <AdminLayout darkMode={darkMode} setDarkMode={setDarkMode} />
        </Suspense>
      ),
      children: [

        { path: '', element: <React.Suspense fallback={<Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100%" padding='2em'><CircularProgress /></Box>}><Hello /></React.Suspense> },
        { path: 'project-table', element: <React.Suspense fallback={<Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100%" padding='2em'><CircularProgress /></Box>}><ProjectTable /></React.Suspense> },
        { path: 'project-member/:id', element: <React.Suspense fallback={<Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100%" padding='2em'><CircularProgress /></Box>}><ProjectMember /></React.Suspense> },

      ]
    },
    {
      path: 'org-dashboard',
      element: (
        <Suspense
          fallback={
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              width="100%"
              padding="2em"
            >
              <CircularProgress />
            </Box>
          }
        >
          <OrganizationLayout darkMode={darkMode} setDarkMode={setDarkMode} />
        </Suspense>
      ),
      children: [
        { path: 'task-table', element: <React.Suspense fallback={<Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100%" padding='2em'><CircularProgress /></Box>}><TaskCreation /></React.Suspense> },
      ]
    },
    // Add more routes here as needed
  ]);

  return <RouterProvider router={router} />;
}

export default App;
