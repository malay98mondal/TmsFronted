import React, { useEffect, useState } from "react";

import AdminContext from '../utils/adminContext'
import { Box, Button, Grid, IconButton, Snackbar } from "@mui/material";

import { Outlet } from "react-router-dom";
import SideNav from "./sideNav";
import OrgContext from "../utils/orgContext";
import { useuserContext } from "../utils/userContext";

export default function OrganizationLayout(props: any) {
  const { darkMode, setDarkMode } = props;

  const [currentTab, setCurrentTab] = useState(1);
  const [showMiniNav, setShowMiniNav] = useState(false);

  const [openNotifer, setOpenNotifier] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState("");
  const [hideDurationNotifier, setHiderDurationNotifier] = useState(50000000);


  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setOpenNotifier(!openNotifer)}
      >
       <Button>close</Button>
      </IconButton>
    </React.Fragment>
  );

  const navigationArray = [
    {
      id: 1,
      name: "dashboard",
      path: "/",
    },
    {
      id: 2,
      name: "Users",
      path: "/admin-dashboard/users",
    },
    {
      id:12,
      name:"Filed Executive",
      path:"/admin-dashboard/field-executive"
    },
    {
      id: 3,
      name: "Country Master",
      path: "/admin-dashboard/country",
    },
    {
      id: 4,
      name: "State Master",
      path: "/admin-dashboard/state",
    },

    {
      id: 5,
      name: "District Master",
      path: "/admin-dashboard/district",
    },
    {
      id: 6,
      name: "Parliment Master",
      path: "/admin-dashboard/parliment",
    },
    {
      id: 7,
      name: "Assembly Master",
      path: "/admin-dashboard/assembly",
    },
    {
      id: 8,
      name: "Mandal Master",
      path: "/admin-dashboard/mandal",
    },
    {
      id: 9,
      name: "Polling Station Master",
      path: "/admin-dashboard/polling-station",
    },
    {
      id: 10,
      name: "Task Creation Master",
      path: "/admin-dashboard/task-creation",
    },
    {
      id: 11,
      name: "Task Allocation",
      path: "/admin-dashboard/task-allocation",
    },
  ];

  function removeDomains(url: any) {
    const domainsToRemove = [
      "http://localhost:3001",
      "'http://localhost:5173'",
    ];
    for (const domain of domainsToRemove) {
      if (url.startsWith(domain)) {
        let result = url.substring(domain.length);
        if (result.endsWith("/")) {
          result = result.slice(0, -1);
        }
        return result;
      }
    }
    return url;
  }

  useEffect(() => {
    const url = window.location.href;

    const path = removeDomains(url);

    console.log(path);

    const find: any = navigationArray?.find((x: any) =>
      x?.path?.includes(path)
    );

    setCurrentTab(find?.id);
  }, []);

 

  return (
    <OrgContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        navigationArray,
        hideDurationNotifier,
        setHiderDurationNotifier,
        notifyMessage,
        setNotifyMessage,
        openNotifer,
        setOpenNotifier,
        showMiniNav,
        setShowMiniNav,
      }}
    >
       
       <Box sx={{display:'flex',flexDirection:'column',width:'100%'}} >
      <Grid container sx={{ minHeight: "90vh", background: "#fff",overflow:'auto' }}>
        <Outlet />
      </Grid>
      </Box>
      <Snackbar
        open={openNotifer}
        autoHideDuration={hideDurationNotifier}
        onClose={() => setOpenNotifier(!openNotifer)}
        message={notifyMessage}
        action={action}
      />
    </OrgContext.Provider>
  );
}
