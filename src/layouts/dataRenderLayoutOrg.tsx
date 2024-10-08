import { Box, Grid } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { useOrgContext } from "../utils/orgContext"
import SideNavOrg from "./sideNavOrg"
import { FaUsers } from 'react-icons/fa';



export default function DataRenderLayoutOrg({ children }:any) {

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
        }        
       
      ];
   
    const {darkMode,activeTab, setActiveTab,showMiniNav,setShowMiniNav} = useOrgContext()

   

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


    return (
        <Grid ref={containerRef} item xs={12} md={12} lg={12} sx={{ overflow:"hidden" ,background: darkMode ? "#010101" :"#fff", height:'50em'}}  >

            <Grid container >
              <Grid item xs={0} md={0} lg={2} m={0} p={0}  sx={{display: { xs: "none", md:"none", lg: "block" }}} >
              <SideNavOrg darkMode={darkMode} activeTab={activeTab} setActiveTab={setActiveTab} routes={navigationArray} showMiniNav={showMiniNav} setShowMiniNav={setShowMiniNav}  />
              </Grid>

              <Grid item xs={12} md={12} lg={10} m={0} p={0} >
              {children}
              </Grid>
            </Grid>          
        </Grid>
    )

}