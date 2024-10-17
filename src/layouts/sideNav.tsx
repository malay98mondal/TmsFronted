import { Box, Divider, List, ListItem, ListItemText } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useAgentContext } from "../utils/agentContext";
import React from "react";
import { Tooltip } from '@mui/material';

export default function SideNav(props: any) {
    const navigate = useNavigate();
    const location = useLocation(); // Hook to get the current location
    const { darkMode, routes, showMiniNav, setShowMiniNav } = props;
    const { id } = useParams();
    const { currentTab, setCurrentTab } = useAgentContext();

    // Update currentTab based on the current URL path
    React.useEffect(() => {
        if (routes?.length > 0) {
            const matchedRoute = routes.find((route: any) => (location.pathname.includes(route.path) || location.pathname.includes(route.path2)));
            if (matchedRoute && matchedRoute.id !== currentTab) {
                setCurrentTab(matchedRoute.id);
                localStorage.setItem('currentTab', JSON.stringify(matchedRoute.id));
            }
        }
    }, [location, routes, currentTab, setCurrentTab]);

    const onchangeCurrentTab = (Itemid: any, path: any) => {
        localStorage.setItem('currentTab', JSON.stringify(Itemid));
        setCurrentTab(Itemid);
        navigate(`${path}`);
    };

    const RenderRoutes = (props: any) => {
        const { item } = props;

        const isActive = currentTab === item?.id || (!currentTab && routes[0]?.id === item?.id);

        return (
            <Box sx={{ display: 'flex', alignItems: "center" }} >
                    <ListItem
                        onClick={() => onchangeCurrentTab(item?.id, item?.path)}
                        key={item?.id}
                        component="li"
                        sx={{
                            width: '100%',
                            background: isActive ? "linear-gradient(to right, #f26729 2%, #333333 1%)" : 'transparent',
                            clipPath: isActive ? 'polygon(0 0, 10% , 20% 100%, 0 100%)' : 'none', // Clip-path for the left part

                            height: "40px",
                            marginBottom: "10px",
                            gap: 2,
                            cursor: 'pointer',
                            color: isActive ? 'grey' : 'black',
                           '&:hover': {
                            backgroundColor: isActive ? "grey" : '#333333', // Slightly darker cyan on hover
                            color: 'black',
                        }
                        }}
                    >
                        <Box sx={{
                            color: isActive ? 'white' : 'inherit',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: "center",
                            '&:hover': { color: 'white' }
                        }}>
                            {item?.icon}
                        </Box>

                        <ListItemText primary={item?.name} sx={{
                            fontSize: '20px',
                            textTransform: "capitalize",
                            whiteSpace: 'nowrap',
                            color:'white',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            '&:hover': { color: 'white' }
                        }} />
                    </ListItem>
            </Box>
        );
    };

    return (
        <Box sx={{
            display: 'flex', flexDirection: "column", alignItems: 'center', height: '92vh',
            boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)",
            position: showMiniNav ? "absolute" : "relative",
            zIndex: "1000",
            width: '100%',
            backgroundColor: '#0A152F' 
        }}>
            {showMiniNav &&
                <CloseIcon sx={{ color: "white", alignSelf: "flex-end" }} onClick={() => setShowMiniNav(!showMiniNav)} />
            }
            <Divider sx={{ borderColor: "gray", width: '100%' }} />
            <List sx={{ width: '100%', height: '100%', gap: 2, background: '#29315a' }}> {/* Set List background to black */}
                {routes?.map((x: any) =>
                    <RenderRoutes item={x} />
                )}
            </List>
        </Box>
    );
}
