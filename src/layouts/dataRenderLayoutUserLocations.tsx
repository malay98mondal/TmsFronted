import { Box, Grid } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { useuserContext } from "../utils/userContext"
import SideNav from "./sideNav"
import { IoLocationSharp } from "react-icons/io5"
import { MdPermContactCalendar } from "react-icons/md"
import { TbHours24 } from "react-icons/tb"
import { FaBookMedical } from "react-icons/fa"


export default function DataRenderLayoutUserLocations({ children }:any) {

    const navigationArray = [
        {
          id: 1,
          name: "Location",
          path: "/user-dashboard/Location-location",
          // icon: <IoLocationSharp style={{ color: 'black' }} />,
          icon: (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                '&:hover svg': {
                  color: 'white', 
                },
              }}
            >
              <IoLocationSharp />
            </Box>
          ),
        },
        {
          id: 2,
          name: "Contact",
          path: "/user-dashboard/Location-contact",
          // icon: <MdPermContactCalendar style={{ color: 'black' }}/>,
          icon: (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                '&:hover svg': {
                  color: 'white', 
                },
              }}
            >
              <MdPermContactCalendar />
            </Box>
          ),
        },
        {
          id: 3,
          name: "Hours",
          path: "/user-dashboard/Location-hours",
          // icon: <TbHours24 style={{ color: 'black' }} />,
          icon: (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                '&:hover svg': {
                  color: 'white', 
                },
              }}
            >
              <TbHours24/>
            </Box>
          ),
        },
        {
          id: 4,
          name: "Billing",
          path: "/user-dashboard/Location-billing",
          // icon: <FaBookMedical style={{ color: 'black' }} />
          icon: (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                '&:hover svg': {
                  color: 'white', 
                },
              }}
            >
              <FaBookMedical />
            </Box>
          ),
        },
       
      ];
   
    const {darkMode,activeTab, setActiveTab,showMiniNav,setShowMiniNav} = useuserContext()

   

    const containerRef = useRef<HTMLDivElement>(null);
    const [, SetTransparent] = useState<boolean>(false);


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
      <Grid
      ref={containerRef}
      item
      xs={12}
      md={12}
      lg={12}
      sx={{ overflow: "auto", background: darkMode ? "#010101" : "#fff" }}
    >
      <Grid container>
        <Grid
          item
          xs={0}
          md={0}
          lg={2} // This should match the width of your SideNav
          sx={{
            display: { xs: "none", md: "none", lg: "block" },
            position: "fixed",      // Keep the SideNav fixed
            height: "100vh",       // Full height of the viewport
            overflowY: "auto",      // Allow scrolling in SideNav
            background: darkMode ? "#010101" : "#fff", // Maintain background color
            zIndex: 1000,           // Ensure it appears above other content
            // Specify a fixed width (adjust based on your SideNav width)
            width: "220px",         // Adjust this value as needed for your SideNav
          }}
        >
          <SideNav 
            darkMode={darkMode} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            routes={navigationArray} 
            showMiniNav={showMiniNav} 
            setShowMiniNav={setShowMiniNav}  
          />
        </Grid>
    
        <Grid
          item
          xs={12}
          md={12}
          lg={10}
          sx={{ marginLeft: "200px", padding: 0 }} // Match marginLeft to SideNav width
        >
          {children}
        </Grid>
      </Grid>
    </Grid>
    
    )

}