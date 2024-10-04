// src/components/WelcomePage.tsx
import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import welcomenav from './welcomeNav'

const WelcomePage: React.FC = () => {
  return (
    <Container>
      <Box my={4}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to My Website
        </Typography>
        <Typography variant="h6" component="p">
          This is a simple welcome page.
        </Typography>
      </Box>
    </Container>
  );
};

export default WelcomePage;
