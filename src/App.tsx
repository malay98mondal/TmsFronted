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

const Sidenav = React.lazy(() => import('./layouts/sideNav'));
const Navbar = React.lazy(() => import('./layouts/navAdmin'));
const Landing = React.lazy(() => import('./layouts/UserDashboards'));
const ProjectMember = React.lazy(() => import('./components/Projets/ProjectMember'));
const TaskCreation = React.lazy(() => import('./components/Task/TaskCreation'));
const EmployTaskTable = React.lazy(() => import('./components/EmployTask/EmployTaskTable'));
const TaskDetails =React.lazy(()=>import('./components/Task/TaskDetails'));
const CompletedTask =React.lazy(()=>import('./components/EmployTask/EmployCompleteTask'));
const EmployeeTable =React.lazy(()=>import('./components/Employee/EmployeTable'));

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
        { path: 'Employee', element: <React.Suspense fallback={<Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100%" padding='2em'><CircularProgress /></Box>}><EmployeeTable /></React.Suspense> },

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
        { path: 'task-table/task-details/:Task_details_Id', element: <React.Suspense fallback={<Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100%" padding='2em'><CircularProgress /></Box>}><TaskDetails /></React.Suspense> },

      ]
    },
    {
      path: "employee-task",
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
          <OrganizationAgentLayout/>
        </Suspense>
      ),
      children: [
        { path: 'EmployTask', element: <React.Suspense fallback={<Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100%" padding='2em'><CircularProgress /></Box>}><EmployTaskTable /></React.Suspense> },
        { path: 'CompletedTask', element: <React.Suspense fallback={<Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100%" padding='2em'><CircularProgress /></Box>}><CompletedTask /></React.Suspense> },
      ]
    },

    
    // Add more routes here as needed
  ]);

  return <RouterProvider router={router} />;
}

export default App;
