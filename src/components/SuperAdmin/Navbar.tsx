import { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Tooltip, Typography, styled } from "@mui/material";


interface StyledButtonProps {
  isActive: boolean; 
}


const StyledButton = styled(Button)<StyledButtonProps>(({ isActive }) => ({
  height: '1.8em',
  paddingBottom: '0.5em',
  paddingTop: '1.5em',
  color: isActive ? 'white' : 'white',
  fontWeight: isActive ? 'bold' : 'normal',
  borderBottom: isActive ? '2px solid white' : 'none', 
  '&:hover': {
    color: 'white',
    fontWeight: 'bold',
    borderBottom: '2px solid white', 
  },
}));

const Navbar = () => {
  const [userData, setUserData] = useState<any>({});
  const [menuAnchor, setMenuAnchor] = useState<any>(null);
  const location = useLocation(); 

 
  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };


  const isActive = (path: string) => location.pathname === path;

  return (
    <Box sx={{ display: 'flex', height: '8vh', alignItems: "center", justifyContent: 'space-between', background: '#0A152F', margin: 0 }}>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, paddingLeft: 2 }}>
        <Avatar sx={{ width: 35, height: 35 }} style={{ marginLeft: '0.5em' }} />
        <Typography variant="h5" color="white" fontSize={30}>
          Credential
        </Typography>

        <Tooltip title="Go to Dashboard">
          <Link to='/super-admin-dashboard' style={{ alignItems: 'center', textDecoration: 'none' }}>
            <StyledButton size="small" isActive={isActive('/super-admin-dashboard')}>
              Dashboard
            </StyledButton>
          </Link>
        </Tooltip>


        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Link to="/super-admin-dashboard/hello" style={{ textDecoration: 'none' }}>
            <StyledButton size="small" isActive={isActive('/super-admin-dashboard/Admin-table')}>
              WorkSpace
            </StyledButton>
          </Link>
        </Box>


        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
        >
          <StyledButton size="small" isActive={false}>Menu</StyledButton>
        </IconButton>


        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem 
            onClick={handleMenuClose} 
            component={Link} 
            to="/super-admin-dashboard/admin-table"
            sx={{ 
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)', // Customize the hover background color here
              }
            }}
          >
            Admin Table
          </MenuItem>
          
          <MenuItem 
            onClick={handleMenuClose} 
            component={Link} 
            to="/super-admin-dashboard/agents-table"
            sx={{ 
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)', // Same hover effect for other menu items
              }
            }}
          >
            Agent Table
          </MenuItem>
          
          <MenuItem 
            onClick={handleMenuClose} 
            component={Link} 
            to="/super-admin-dashboard/users-table"
            sx={{ 
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)', // Same hover effect for other menu items
              }
            }}
          >
            User Table
          </MenuItem>
        </Menu>


        <Typography sx={{ fontSize: '17px', textTransform: 'capitalize', color: 'black', }}>{userData?.user_name}</Typography>
      </Box>


      <Box sx={{ display: "flex", alignItems: 'center', gap: 1, paddingRight: 2 }}>
      </Box>
    </Box>
  );
};

export default Navbar;
