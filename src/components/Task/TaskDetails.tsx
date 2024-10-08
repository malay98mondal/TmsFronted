import React, { useEffect, useState } from 'react';
import { Paper, Grid, Typography, Divider, Box, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import DataRenderLayoutOrg from '../../layouts/dataRenderLayoutOrg';
import { getTaskDetailsById } from '../../apiRequest/TaskRoutes/TaskRoutes';

interface TaskDetailsProps {
  // Define your state types here if necessary
}

const TaskDetails: React.FC<TaskDetailsProps> = () => {
  const { Task_details_Id } = useParams<{ Task_details_Id: string }>(); // Extract the task ID from the URL params
  const [taskDetails, setTaskDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch task details on component mount
  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const data = await getTaskDetailsById(Number(Task_details_Id)); // Fetch task details by ID
        setTaskDetails(data);
      } catch (error) {
        setError('Failed to fetch task details.');
      } finally {
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [Task_details_Id]);

  // Show loading indicator while fetching data
  if (loading) {
    return <div>Loading task details...</div>;
  }

  // Show error if any
  if (error) {
    return <div>{error}</div>;
  }

  // Render task details if available
  return (
    <DataRenderLayoutOrg>
      <Paper
        elevation={3}
        sx={{
          padding: '24px',
          borderRadius: '8px',
          maxWidth: '800px',
          margin: 'auto',
          marginTop: '3em',
          backgroundColor: '#f4f6f8',
        }}
      >
        {/* Header Section */}
        <Typography variant="h5" align="center" gutterBottom>
          Timesheet Summary
        </Typography>
        <Divider />

        {/* Employee and Timesheet Information */}
        <Box my={2}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle1">
                <strong>Employee Name:</strong> {taskDetails?.employee?.Employee_name || 'N/A'}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Employee ID:</strong> {taskDetails?.employee?.Emp_Id || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">
                <strong>Role:</strong> {taskDetails?.role?.Name || 'N/A'}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Project:</strong> {taskDetails?.project?.Project_Name || 'N/A'}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Divider />

        {/* Task Information */}
        <Box my={2}>
          <Typography variant="h6" gutterBottom>
            Task Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle2">
                <strong>Task 1:</strong>
              </Typography>
              <Typography variant="body2">
                Task Status: {taskDetails?.taskDetails?.Status || 'N/A'}
              </Typography>
              <Typography variant="body2">
                Task Name: {taskDetails?.taskDetails?.Task_Details || 'N/A'}
              </Typography>
              <Typography variant="body2">
                Start Time: {taskDetails?.taskDetails?.Start_Time || 'N/A'}
              </Typography>
              <Typography variant="body2">End Date: {taskDetails?.taskDetails?.End_Date || 'N/A'}</Typography>

              <Typography variant="body2">End Time: {taskDetails?.taskDetails?.End_Time  || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={6}>
              
              
              <Typography variant="body2">
              Extend Start Date: {taskDetails?.taskDetails?.Extend_Start_Date || 'N/A'}
              </Typography>
              <Typography variant="body2">Extend Start Time: {taskDetails?.taskDetails?.Extend_Start_Time || 'N/A'}</Typography>

              <Typography variant="body2">Extend End Date: {taskDetails?.taskDetails?.Extend_End_Date  || 'N/A'}</Typography>
              <Typography variant="body2">Extend End Time:{taskDetails?.taskDetails?.Extend_End_Time  || 'N/A'}</Typography>
              <Typography variant="body2">Remarks:{taskDetails?.taskDetails?.Remarks  || 'N/A'}</Typography>

            </Grid>
            {/* You can render more tasks if needed */}
          </Grid>
        </Box>

        <Divider />

        {/* Footer Section */}
        <Box mt={3} display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">
            {/* <strong>Total Hours: 5</strong> Adjust based on your data */}
          </Typography>
        </Box>
      </Paper>
    </DataRenderLayoutOrg>
  );
};

export default TaskDetails;
