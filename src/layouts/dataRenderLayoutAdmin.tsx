import { Box, Button, Drawer, Grid, IconButton } from "@mui/material"
import NavAdmin from './navAdmin'
import { useEffect, useRef, useState } from "react"
import { useAdminContext } from "../utils/adminContext"
import { FaUsers } from "react-icons/fa6";
import MenuIcon from '@mui/icons-material/Menu';


export default function DataRenderLayoutAdmin({ children }:any) {
   
  const navigationArray = [

    {
      id: 1,
      name: "Projects",
      path: "/projects/project-table",
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
      name: "Employee",
      path: "/projects/Employee",
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
    // {
    //   id: 3,
    //   name: "Users",
    //   path: "/super-admin-dashboard/users-table",
    //   icon: (
    //     <Box
    //       sx={{
    //         display: 'flex',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //         '&:hover svg': {
    //           color: 'white', 
    //         },
    //       }}
    //     >
    //       <FaUsers />
    //     </Box>
    //   ),
    // },
  ];

    const {darkMode,activeTab, setActiveTab,showMiniNav,setShowMiniNav} = useAdminContext()

   

    const containerRef = useRef<HTMLDivElement>(null);
    const [transparent, SetTransparent] = useState<boolean>(false);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

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


    return (
        <Grid container sx={{ height: "92vh", background: darkMode ? "#010101" : "#fff",overflow:"hidden" }} >

              <Grid item xs={0} md={0} lg={2.5} m={0} p={0}  sx={{display: { xs: "none", lg: "block" }, height: 'auto', overflow: 'auto'}} >
              <NavAdmin darkMode={darkMode} activeTab={activeTab} setActiveTab={setActiveTab} routes={navigationArray} showMiniNav={showMiniNav} setShowMiniNav={setShowMiniNav}  />
              </Grid>
              <Grid item xs={12} md={12} lg={0} sx={{display: { xs: "block", lg: "none" } }}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleDrawerToggle}
                    sx={{ ml: 2, alignItems: 'center', textAlign: 'right' }}
                >
                    <MenuIcon sx={{color:'#29315a'}}/>
                    </IconButton>
                <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={handleDrawerToggle}
                    sx={{ "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250, mt: 6 } }}
                >
                    <NavAdmin
                        darkMode={darkMode}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        routes={navigationArray}
                        showMiniNav={showMiniNav}
                        setShowMiniNav={setShowMiniNav}
                    />
                </Drawer>
            </Grid>
              <Grid item xs={12} md={12} lg={9.5} sx={{ ml: { lg: "auto" }, overflowY: "auto", height: "92vh" }} ref={containerRef}>
                {children}
            </Grid>          
        </Grid>
    )

}