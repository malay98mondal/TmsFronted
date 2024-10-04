import { Box, Divider, List, ListItem, ListItemText } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router-dom';
import { useProviderContext } from "../utils/providerContext";
import React from "react";

export default function ProviderSideNav(props: any) {
    const navigate = useNavigate();
    const { darkMode, routes, showMiniNav, setShowMiniNav } = props;
    const { id } = useParams();
    const { currentTab, setCurrentTab } = useProviderContext();

    // Set initial currentTab to the first item's id if not already set
    React.useEffect(() => {
        if (!currentTab && routes?.length > 0) {
            const firstItemId = routes[0]?.id;
            setCurrentTab(firstItemId);
            localStorage.setItem('currentTab', JSON.stringify(firstItemId));
        }
    }, [currentTab, routes, setCurrentTab]);

    const onchangeCurrentTab = (Itemid: any, path: any) => {
        localStorage.setItem('currentTab', JSON.stringify(Itemid));
        setCurrentTab(Itemid);
        navigate(`${path}`);
    };

    const RenderRoutes = (props: any) => {
        const { item } = props;
        const isActive = currentTab === item?.id || (!currentTab && routes[0]?.id === item?.id);

        return (
            <Box sx={{ display: 'flex', alignItems: 'center', padding: '0 10px' }}>
                <ListItem
                    onClick={() => onchangeCurrentTab(item?.id, item?.path)}
                    key={item?.id}
                    component="li"
                    sx={{
                        width: '100%',
                        // background: currentTab === item?.id ? "linear-gradient(195deg, #49a3f1, #1A73E8)" : 'transparent',
                        background: isActive ? "#6E2EC0" : 'transparent',
                        borderRadius: "20px",
                        height: "40px",
                        marginBottom: "10px",
                        // '&:hover': { backgroundColor: '#6E2EC0', color: 'white' },
                        gap: 2,
                        cursor: 'pointer',
                        // color: currentTab === item?.id || (!currentTab && routes[0]?.id === item?.id) ? 'white' : 'black',
                        color: isActive ? 'white' : 'black',
                        '&:hover': {
                            backgroundColor: isActive ? "linear-gradient(195deg, #49a3f1, #1A73E8)" : '#007FFF',
                            color: 'white',
                        }
                    }}
                >
                    <Box sx={{
                        // color: 'white',
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
            </Box>
        );
    };

    return (
        <Box sx={{
            display: 'flex', flexDirection: "column", alignItems: 'center', height: '92vh',
            boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", background: "#D9D9D9",
            position: showMiniNav ? "absolute" : "relative",
            zIndex: "1000",
            width: '100%'
        }}>
            {showMiniNav &&
                <CloseIcon sx={{ color: "white", alignSelf: "flex-end" }} onClick={() => setShowMiniNav(!showMiniNav)} />
            }
            <Divider sx={{ borderColor: "gray", width: '100%' }} />
            <List sx={{ width: '100%', gap: 2, background: '#E0E5E5', height: '100%' }}>
                {routes?.map((x: any) =>
                    <RenderRoutes item={x} />
                )}
            </List>
        </Box>
    )
}
