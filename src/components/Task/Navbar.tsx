import { Avatar, Box, Tooltip, Typography, styled, IconButton, Button } from "@mui/material";
import { useState } from "react";
import Cookies from 'js-cookie';
import LogoutDialog from "../../middleware/LogoutDialog";

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

const Navbar = () => {
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const handleLogout = () => {
    // Replace this with your cookie removal logic
    Cookies.remove('employeeCookies');
    window.location.href = '/login'; // Redirect to login after logout
  };

  return (
    <NavbarContainer>
      <Logo variant="h6">Employee</Logo>

        <Tooltip title="Logout">
          <Button variant="contained" color="secondary" onClick={() => setOpenLogoutDialog(true)}>
          Logout
          </Button>
        </Tooltip>
 
      <LogoutDialog
        open={openLogoutDialog}
        onClose={() => setOpenLogoutDialog(false)}
        onConfirm={handleLogout}
      />
    </NavbarContainer>
  );
};

export default Navbar;
