import { Box, Divider, List, ListItem, ListItemText } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useAgentContext } from "../utils/agentContext";
import React from "react";
import { FaBookMedical } from "react-icons/fa6";
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
          
                <Box sx={{ display: 'flex', alignItems: "center", padding: '0  10px' }} >
<Tooltip title={item?.name} placement="left">
                    <ListItem
                        onClick={() => onchangeCurrentTab(item?.id, item?.path)}
                        key={item?.id}
                        component="li"
                        sx={{
                            width: '100%',
                            background: isActive ? "#6E2EC0" : 'transparent',
                            // background: isActive ? "linear-gradient(195deg, #49a3f1, #1A73E8)" : '#6E2EC0',
                            borderRadius: "20px",
                            height: "40px",
                            marginBottom: "10px",

                            gap: 2,
                            cursor: 'pointer',
                            color: isActive ? 'white' : 'black',
                            '&:hover': {
                                backgroundColor: isActive ? "linear-gradient(195deg, #49a3f1, #1A73E8)" : '#007FFF',
                                color: 'white',
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
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            '&:hover': { color: 'white' }
                        }} />

                    </ListItem>
                    </Tooltip>
                </Box>
          



        );
    };

    return (
        <Box sx={{
            display: 'flex', flexDirection: "column", alignItems: 'center', height: '92vh',
            boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)",
            position: showMiniNav ? "absolute" : "relative",
            zIndex: "1000",
            width: '100%'
        }}>
            {showMiniNav &&
                <CloseIcon sx={{ color: "white", alignSelf: "flex-end" }} onClick={() => setShowMiniNav(!showMiniNav)} />
            }
            <Divider sx={{ borderColor: "gray", width: '100%' }} />
            <List sx={{ width: '100%', height: '100%', gap: 2, background: '#E0E5E5' }}>
                {routes?.map((x: any) =>
                    <RenderRoutes item={x} />
                )}

            </List>
        </Box>
    );
}
