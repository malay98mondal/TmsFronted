import { Grid } from "@mui/material"
import NavAdmin from './navAdmin'
import { useEffect, useRef, useState } from "react"
import { useAdminContext } from "../utils/adminContext"
import SideNav from "./sideNav"


export default function DataRenderLayoutAdminProvider({ children }:any) {
   
    const {darkMode,showMiniNav,setShowMiniNav,navigationArray,currentTab,setCurrentTab} = useAdminContext()

   

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
       
      <Grid container >

        <Grid item >
        <SideNav
            showMiniNav={showMiniNav}
            setShowMiniNav={setShowMiniNav}
            routes={navigationArray}
            darkMode={darkMode}
            activeTab={currentTab}
            setActiveTab={setCurrentTab}
          />
        </Grid>
        <Grid ref={containerRef} item xs={12} md={12} lg={10} sx={{ overflow:"auto",background: darkMode ? "#010101" :"#fff"}}  >
            {/* <NavAdmin transparent={transparent} /> */}
            {children}

        </Grid>
      </Grid>
        
    )

}