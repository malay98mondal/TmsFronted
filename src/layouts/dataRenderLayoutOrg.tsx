import { Box, Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useOrgContext } from "../utils/orgContext";
import SideNavOrg from "./sideNavOrg";
import { FaUsers } from 'react-icons/fa';

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

    return (
        <Grid ref={containerRef} container sx={{ overflow: "auto", background: darkMode ? "#010101" : "#fff", height: '100vh' }}>
            {/* Sidebar container with sticky position */}
            <Grid
                item
                xs={0} md={0} lg={2} m={0} p={0}
                sx={{
                    display: { xs: "none", md: "none", lg: "block" },
                    position: "sticky", // Sticky positioning for sidebar
                    top: 0, // Stick to the top of the viewport
                    height: '100vh', // Full height for sidebar
                    zIndex: 1000, // Ensure it stays above the content
                }}
            >
                <SideNavOrg darkMode={darkMode} activeTab={activeTab} setActiveTab={setActiveTab} routes={navigationArray} showMiniNav={showMiniNav} setShowMiniNav={setShowMiniNav} />
            </Grid>

            {/* Main content */}
            <Grid item xs={12} md={12} lg={10} m={0} p={0}>
                {children}
            </Grid>
        </Grid>
    );
}
