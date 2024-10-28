import { Box, Button, Drawer, Grid, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useOrgContext } from "../utils/orgContext";
import SideNavOrg from "./sideNavOrg";
import { FaUsers } from 'react-icons/fa';
import MenuIcon from '@mui/icons-material/Menu';
export default function DataRenderLayoutOrg({ children }: any) {

    const navigationArray = [
        {
            id: 1,
            name: "Task",
            path: "/org-dashboard/task-table",
            icon: (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover svg': {
                            color: 'white',
                        },
                    }}
                >
                    <FaUsers />
                </Box>
            ),
            
        },
        {
            id: 2,
            name: "Own Task",
            path: "/org-dashboard/own-task",
            icon: (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover svg': {
                            color: 'white',
                        },
                    }}
                >
                    <FaUsers />
                </Box>
            ),
            
        }
    ];

    const { darkMode, activeTab, setActiveTab, showMiniNav, setShowMiniNav } = useOrgContext();

    const containerRef = useRef<HTMLDivElement>(null);
    const [transparent, SetTransparent] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const { scrollTop } = containerRef.current;

                if (scrollTop > 1) {
                    SetTransparent(true);
                    console.log(`on:${scrollTop}`);
                } else {
                    SetTransparent(false);
                    console.log(`off:${scrollTop}`);
                }
            }
        };

        const containerElement = containerRef.current;
        if (containerElement) {
            containerElement.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (containerElement) {
                containerElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <Grid
        ref={containerRef}
        container
        sx={{
          overflow: "auto",
          background: darkMode ? "#010101" : "#fff",
          height: '',
        }}
      >
        {/* Sidebar container with sticky position */}
        <Grid
          item
          xs={0}
          md={0}
          lg={2.5}
          sx={{
            display: { xs: "none", md: "none", lg: "block" },
            position: "sticky",
            top: 0,
            height: '100vh',
            zIndex: 1000,
          }}
        >
          <SideNavOrg
            darkMode={darkMode}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            routes={navigationArray}
            showMiniNav={showMiniNav}
            setShowMiniNav={setShowMiniNav}
          />
        </Grid>
      
        {/* Menu icon for mobile view */}
        <Grid
          item
          xs={4}
          md={4}
          lg={0}
          sx={{
            display: { xs: "block", lg: "none" },
            mt: 2,  // Adds margin at the top for spacing
      ml: 2,  
      mb:5  
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ ml: 2, alignItems: 'center' }}
          >
            <MenuIcon sx={{ color: '#29315a' }} />
          </IconButton>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={handleDrawerToggle}
            sx={{ "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250, mt: 6 } }}
          >
            <SideNavOrg
              darkMode={darkMode}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              routes={navigationArray}
              showMiniNav={showMiniNav}
              setShowMiniNav={setShowMiniNav}
            />
          </Drawer>
        </Grid>
      
        {/* Main content */}
        <Grid
          item
          xs={12}
          md={12}
          lg={9.5}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            m: 0,
            p: 0,
          }}
        >
          {children}
        </Grid>
      </Grid>
      
    );
}
