import { Avatar, Box, Button, Tooltip, Typography, styled, InputBase } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

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


const StyledInput = styled(InputBase)({
  color: 'white',
  marginLeft: '0.5rem',
  '& .MuiInputBase-input': {
    padding: '0.5rem',
    color: 'white',
  },
  '& .MuiInputBase-input::placeholder': {
    color: '#B0B0B0',
  },
});

const Navbar = () => {
  return (
    <NavbarContainer>
      {/* Logo */}
      <Logo variant="h6">Manager</Logo>

      

      {/* User Avatar */}
      <Tooltip title="User Profile">
        <Avatar sx={{ width: 35, height: 35 }} />
      </Tooltip>
    </NavbarContainer>
  );
};

export default Navbar;
