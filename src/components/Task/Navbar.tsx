import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Avatar, Badge, Box, Button, Dialog, DialogContent, DialogTitle, Divider, IconButton, Menu, MenuItem, Typography, CircularProgress, ListItem, List, Tooltip, styled } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/Close';
import React from "react";
import CancelIcon from '@mui/icons-material/Cancel';

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
  const [notifications, setNotifications] = useState<any[]>([]);
  const [notificationsAll, setNotificationsAll] = useState<any[]>([]);

  const [selectedNotification, setSelectedNotification] = useState<any>(null); // State for selected notification
  const [statusCount, setStatusCount] = useState<number>(0);
  const [notificationAnchor, setNotificationAnchor] = useState<any>(null);

  const [page1, setPage1] = useState<number>(1);
  const [page2, setPage2] = useState<number>(1);
  
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [rowsPerPageAll, setRowsPerPageAll] = useState<number>(5);

  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [loadingAll, setLoadingAll] = useState<boolean>(false);
  const [hasMoreAll, setHasMoreAll] = useState<boolean>(true);


  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // State to control dialog visibility
  const [isViewAllDialogOpen, setIsViewAllDialogOpen] = useState(false);


 
 

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleNotificationOpen = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  

  //View all notifications------------------------------------------------------

  const handleViewAllClick = () => {
    setIsViewAllDialogOpen(true);
  };

  const handleViewAllDialogClose = () => {
    setIsViewAllDialogOpen(false);
  };

  //-------------------------------------------------------------------------

  // Infinite Scroll logic
  const loadMoreNotifications = () => {
    if (!loading && hasMore) {
      setPage1((prevPage) => prevPage + 1);
    }
  };

  const loadMoreNotificationsAll = () => {
    if (!loadingAll && hasMoreAll) {
      setPage2((prevPage) => prevPage + 1);
    }
  };

  
  const isActive = (path: string) => location.pathname === path;

  return (
    <Box sx={{ display: 'flex', height: '8vh', alignItems: 'center', justifyContent: 'space-between', background: '#0A152F', margin: 0 }}>
      {/* Left side with logo, avatar, and username */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, paddingLeft: 2 }}>
      <Avatar sx={{ width: 35, height: 35 }} />
        <Typography variant="h5" color="white" fontSize={30}>
        </Typography>
{/* Bell Icon with Badge */}
<Tooltip title="Notifications" placement="bottom">
        <IconButton color="inherit" onClick={handleNotificationOpen}>
        <StyledButton size="small" isActive={isActive('/super-admin-dashboard')}>
            </StyledButton>
        </IconButton>
        </Tooltip>

        {/* Notification Panel */}
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleNotificationClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{
            mt: 5,
            '& .MuiMenu-paper': {
              backgroundColor: '#f5f5f5', // Light gray background
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Soft shadow for a polished look
              borderRadius: '8px', // Rounded corners
              width: '300px', // Fixed width
              maxHeight: '400px',
              overflowY: 'auto', // Enable vertical scrolling
              '&::-webkit-scrollbar': {
                width: '0px', // Hide scrollbar in WebKit browsers
                display: 'none',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'transparent', // Set the scrollbar thumb to be transparent
              },
              '-ms-overflow-style': 'none',  // Hide scrollbar in IE and Edge
              'scrollbar-width': 'none',     // Hide scrollbar in Firefox

            },
          }}
        >
            <>
             

              {/* Infinite Scroll - Placeholder */}
              {loading && (
                <Box display="flex" justifyContent="center" p={2}>
                  <CircularProgress size={24} />
                </Box>
              )}


              {!hasMore && !loading && (
                <MenuItem>
                  <Typography variant="body2" sx={{ color: 'gray' }}>No more notifications</Typography>
                </MenuItem>
              )}

              <Divider />
            </>
        






          <MenuItem onClick={handleViewAllClick}>
            <Typography variant="body2" sx={{ color: 'blue', textAlign: 'center', width: '100%' }}>
            </Typography>
          </MenuItem>
          {/* View All Notifications Dialog */}
          <Dialog
            open={isViewAllDialogOpen}
            onClose={handleViewAllDialogClose}
            fullWidth
            maxWidth="sm"
            sx={{
              '& .MuiDialog-paper': {
                borderRadius: '10px',
                boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <DialogTitle>
              <Tooltip title="close" placement="top">
              <IconButton
                aria-label="close"
                onClick={handleViewAllDialogClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
              </Tooltip>
            </DialogTitle>
            <DialogContent dividers>
              <List>
                {notificationsAll.map((notification) => (
                  <React.Fragment key={notification.notification_id}>
                    <ListItem
                      sx={{
                        backgroundColor: notification.status ? '#ffffff' : '#f0f0f0',
                        '&:hover': {
                          backgroundColor: '#6E2EC0',
                          color: 'white',
                        },
                        padding: '10px',
                        borderRadius: '8px',
                        marginBottom: '8px',
                      }}
                    >
                      <Box sx={{ width: '100%' }}>
                        <Typography variant="body1">{notification.title}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(notification.createdAt).toLocaleString()}
                        </Typography>
                      </Box>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}

                {loadingAll && (
                  <Box display="flex" justifyContent="center" p={2}>
                    <CircularProgress size={24} />
                  </Box>
                )}


                {!hasMoreAll && !loadingAll && (
                  <MenuItem>
                    <Typography variant="body2" sx={{ color: 'gray' }}>No more notifications</Typography>
                  </MenuItem>
                )}
              </List>
            </DialogContent>
          </Dialog>



        </Menu>

        {/* Dialog to show notification details */}
       
        {/* Home Button */}
        <Link to='/agent-dashboard'>
          <Tooltip title="Go to Dashboard" arrow>
          <StyledButton size="small" isActive={isActive('/super-admin-dashboard')}>
            </StyledButton>
          </Tooltip>
        </Link>


        <Link to="/agent-dashboard/AgentTaskTable">
        <Tooltip title="Workspace" arrow>
        <StyledButton size="small" isActive={isActive('/super-admin-dashboard')}>
              
            </StyledButton>
            </Tooltip>
            </Link>

      </Box>

      {/* Right side with avatar, username, notifications, home button, and logout button */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, paddingRight: 2 }}>
        <Avatar sx={{ width: 30, height: 30 }} />
        <Typography sx={{ fontSize: '20px', textTransform: 'capitalize', color: 'white', marginRight:'1em'}}>
          {userData?.user_name}
        </Typography>

        

      </Box>
    </Box>
  );
};

export default Navbar;