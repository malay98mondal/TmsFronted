import React, { useState } from "react";
import { Avatar, Box, Button, Tooltip, Typography, styled } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import LogoutDialog from "../../middleware/LogoutDialog";
import { managerCookies, memberCookiers, teamLeadCookies } from "../../apiRequest/ConfigData";

// Styled components
const NavbarContainer = styled(Box)({
  display: 'flex',
  height: '8vh',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: '#29315a',
  padding: '0 2rem',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
});

const Logo = styled(Typography)({
  fontSize: '24px',
  color: 'white',
  fontWeight: 'bold',
  textTransform: 'uppercase',
});

// Logout function
const handleLogout = () => {
  if (Cookies.get(managerCookies)) {
    Cookies.remove(managerCookies);
  } else if (Cookies.get(teamLeadCookies)) {
    Cookies.remove(teamLeadCookies);
  } else if (Cookies.get(memberCookiers)) {
    Cookies.remove(memberCookiers);
  }
};

const Navbar = () => {
  const [openDialog, setOpenDialog] = useState(false); // State to handle dialog visibility
  const navigate = useNavigate(); // React Router's navigate function

  // Open the logout dialog
  const handleLogoutClick = () => {
    setOpenDialog(true);
  };

  // Close the dialog without logging out
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Confirm logout: logout the user and redirect to login
  const handleConfirmLogout = () => {
    handleLogout();
    setOpenDialog(false);
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <NavbarContainer>
      {/* Logo */}
      <Logo variant="h6">Manager</Logo>

      {/* Logout Button */}
      <Tooltip title="Logout">

      <Button variant="contained" color="secondary" onClick={handleLogoutClick}>
        Logout
      </Button>
      </Tooltip>

      {/* Reusable LogoutDialog */}
      <LogoutDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmLogout} // Pass the logout handler
      />
    </NavbarContainer>
  );
};

export default Navbar;
