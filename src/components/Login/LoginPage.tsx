// Login.tsx
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { loginUser } from '../../apiRequest/AuthRoute/LoginApi';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { managerCookies, memberCookiers, teamLeadCookies } from '../../apiRequest/ConfigData';

// Styled components
const StyledContainer = styled(Container)(({ theme }) => ({
  height: '100vh',
  background: '#f5f5f5',
  padding: 0, // Remove default padding
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  opacity: 0.9,
  backdropFilter: 'blur(5px)',
  borderRadius: '10px',
  width: '100%', // Make the Paper full width
  maxWidth: '400px', // Set a max width for the Paper
}));

const StyledImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover', // Ensure the image covers the area properly
});

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success'
  );
  const handleLogout = () => {
    if (Cookies.get(managerCookies)) {
      Cookies.remove(managerCookies);
    } else if (Cookies.get(teamLeadCookies)) {
      Cookies.remove(teamLeadCookies);
    } else if (Cookies.get(memberCookiers)) {
      Cookies.remove(memberCookiers);
    } 
  };

  function clearCookies() {
    handleLogout();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      clearCookies();
      const { access_token, type } = data;
      console.log(data)
      if (data.type === 1) {
        Cookies.set(managerCookies, data?.access_token);
        setTimeout(() => window.location.href = '/projects/project-table', 1500);
      } else if (data.type === 2) {
        Cookies.set(teamLeadCookies, data?.access_token);
        setTimeout(() => window.location.href = '/org-dashboard/task-table', 1500);
      } else if (data.type === 3) {
        Cookies.set(memberCookiers, data?.access_token);
        setTimeout(() => window.location.href = '/employee-task/EmployTask', 1500);
      } 
      setSnackbarMessage('Login successful! Redirecting...');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setTimeout(() => {
      }, 2000);
    } catch (error: any) {
      setSnackbarMessage(
        error.response?.data?.message || 'An error occurred, please try again'
      );
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Grid container style={{ height: '100%'}}>
        <Grid item xs={12} sm={6} md={6} display="flex" justifyContent="center" alignItems="center" sx={{padding:"4em"}}>
          <StyledPaper elevation={3}>
            <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{ marginTop: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Login'}
              </Button>
            </form>
          </StyledPaper>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbarSeverity}
              sx={{ width: '100%' }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Grid>
        <Grid item xs={12} sm={6} md={6} sx={{padding:'5em'}}>
          <StyledImage
            src="../../../src/utils/signup 1.png" // Replace with your image path
            alt="Login Illustration"
          />
        </Grid>
      </Grid>
  );
};

export default Login;
