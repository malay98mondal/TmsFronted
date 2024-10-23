import { Grid, Drawer, IconButton, Typography, Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useRef, useState } from "react";
import { useAgentContext } from "../utils/agentContext";
import SideNav from "./sideNav";

export default function DataRenderLayoutAgent({ children }: any) {
    const { darkMode, activeTab, setActiveTab, navigationArray, showMiniNav, setShowMiniNav } = useAgentContext();
    const containerRef = useRef<HTMLDivElement>(null);
    const [transparent, SetTransparent] = useState<boolean>(false);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

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

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <Grid container sx={{ height: "100vh", background: darkMode ? "#010101" : "#fff",overflow:"hidden" }}>
            {/* Permanent SideNav for larger screens */}
            <Grid item xs={0} md={0} lg={2.5} sx={{ display: { xs: "none", lg: "block" }, height: "92vh", overflowY: "auto" }}>
                <SideNav
                    darkMode={darkMode}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    routes={navigationArray}
                    showMiniNav={showMiniNav}
                    setShowMiniNav={setShowMiniNav}
                />
            </Grid>

            {/* Drawer for smaller screens */}
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
                    <SideNav
                        darkMode={darkMode}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        routes={navigationArray}
                        showMiniNav={showMiniNav}
                        setShowMiniNav={setShowMiniNav}
                    />
                </Drawer>
            </Grid>

            {/* Main content area */}
            <Grid item xs={12} md={12} lg={9.5} sx={{ ml: { lg: "auto" }, overflowY: "auto", height: "92vh" }} ref={containerRef}>
                {children}
            </Grid>
        </Grid>
    );
}
