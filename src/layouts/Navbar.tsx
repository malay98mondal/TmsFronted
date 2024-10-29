import { Avatar, Box, Button, Tooltip, Typography, styled, InputBase, IconButton } from "@mui/material";
import { useState } from "react";
import LogoutDialog from "../middleware/LogoutDialog";
import { teamLeadCookies } from "../apiRequest/ConfigData";
import Cookies from 'js-cookie';

const NavbarContainer = styled(Box)({
  display: "flex",
  height: "8vh",
  alignItems: "center",
  justifyContent: "space-between",
  background: "#29315a",
  padding: "0 2rem",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
});

const Logo = styled(Typography)({
  fontSize: "24px",
  color: "white",
  fontWeight: "bold",
  textTransform: "uppercase",
});

const StyledInput = styled(InputBase)({
  color: "white",
  marginLeft: "0.5rem",
  "& .MuiInputBase-input": {
    padding: "0.5rem",
    color: "white",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#B0B0B0",
  },
});

const Navbar = () => {
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const handleLogout = () => {
    Cookies.remove(teamLeadCookies);
    window.location.href = '/login'; // Redirect after logout
  };

  return (
    <NavbarContainer>
      {/* Logo */}
      <Logo variant="h6">Team Lead</Logo>

      {/* User Avatar and Logout Button */}
      <Box>
        <Tooltip title="Logout">
          <Button variant="contained" color="secondary" onClick={() => setOpenLogoutDialog(true)}>
        Logout
      </Button>
        </Tooltip>
      </Box>

      {/* Logout Confirmation Dialog */}
      <LogoutDialog
        open={openLogoutDialog}
        onClose={() => setOpenLogoutDialog(false)}
        onConfirm={handleLogout}
      />
    </NavbarContainer>
  );
};

export default Navbar;
