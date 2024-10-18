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
import DataRenderLayoutUser from './layouts/dataRenderLayoutUser';
import OrganizationAgentLayout from './layouts/organizationAgentLayout';
import Hello from './components/Hello';
import ProjectTable from './components/Projets/ProjectTable';
import { protectedRouter } from './protectedRoutes/protectedRoute';

const Sidenav = React.lazy(() => import('./layouts/sideNav'));
const Navbar = React.lazy(() => import('./layouts/navAdmin'));
const ProjectMember = React.lazy(() => import('./components/Projets/ProjectMember'));
const TaskCreation = React.lazy(() => import('./components/Task/TaskCreation'));
const EmployTaskTable = React.lazy(() => import('./components/EmployTask/EmployTaskTable'));
const TaskDetails =React.lazy(()=>import('./components/Task/TaskDetails'));
const CompletedTask =React.lazy(()=>import('./components/EmployTask/EmployCompleteTask'));
const EmployeeTable =React.lazy(()=>import('./components/Employee/EmployeTable'));
const LoginPage =React.lazy(()=>import('./components/Login/LoginPage'));

function App() {

  const [darkMode, setDarkMode] = useState(false);

  const router = createBrowserRouter([
    {
      path: 'projects',
      element: protectedRouter() == "manager" ? <React.Suspense fallback={<Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100%" padding='2em'><CircularProgress /></Box>}>
        <AdminLayout darkMode={darkMode} setDarkMode={setDarkMode} /></React.Suspense> : <Navigate to="/login" />,

      children: [

        { path: '', element: <React.Suspense fallback={<Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100%" padding='2em'><CircularProgress /></Box>}><Hello /></React.Suspense> },
        { path: 'project-table', element: <React.Suspense fallback={<Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100%" padding='2em'><CircularProgress /></Box>}><ProjectTable /></React.Suspense> },
        { path: 'project-member/:id', element: <React.Suspense fallback={<Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100%" padding='2em'><CircularProgress /></Box>}><ProjectMember /></React.Suspense> },
        { path: 'Employee', element: <React.Suspense fallback={<Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100%" padding='2em'><CircularProgress /></Box>}><EmployeeTable /></React.Suspense> },

      ]
    },
    {
      path: 'org-dashboard',
      element: protectedRouter() == "teamlead" ? <React.Suspense fallback={<Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100%" padding='2em'><CircularProgress /></Box>}>
      <OrganizationLayout darkMode={darkMode} setDarkMode={setDarkMode} /></React.Suspense> : <Navigate to="/login" />,

      children: [
        { path: 'task-table', element: <React.Suspense fallback={<Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100%" padding='2em'><CircularProgress /></Box>}><TaskCreation /></React.Suspense> },
        { path: 'task-table/task-details/:Task_details_Id', element: <React.Suspense fallback={<Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100%" padding='2em'><CircularProgress /></Box>}><TaskDetails /></React.Suspense> },

      ]
    },
    {
      path: "employee-task",
      element: protectedRouter() == "member" ? <React.Suspense fallback={<Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100%" padding='2em'><CircularProgress /></Box>}>
      <OrganizationAgentLayout  /></React.Suspense> : <Navigate to="/login" />,

      children: [
        { path: 'EmployTask', element: <React.Suspense fallback={<Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100%" padding='2em'><CircularProgress /></Box>}><EmployTaskTable /></React.Suspense> },
        { path: 'CompletedTask', element: <React.Suspense fallback={<Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100%" padding='2em'><CircularProgress /></Box>}><CompletedTask /></React.Suspense> },
      ]
    },

    { path: '/login', element: <React.Suspense fallback={<Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100%" padding='2em'><CircularProgress /></Box>}><LoginPage /></React.Suspense> },

    // Add more routes here as needed
  ]);

  return <RouterProvider router={router} />;
}

export default App;
