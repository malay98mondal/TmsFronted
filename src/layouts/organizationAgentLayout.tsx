import React, { useEffect, useState } from "react";
import { Box, Button, Grid, IconButton, Snackbar } from "@mui/material";

import { Outlet } from "react-router-dom";
import AgentContext from "../utils/agentContext";
import Navbar from "../components/Task/Navbar";

export default function OrganizationAgentLayout() {
  // const { darkMode, setDarkMode } = props;

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
      name: "Tasks",
      path: "/employee-task/EmployTask",
    },
    {
      id: 2,
      name: "Completedtask",
      path: "/employee-task/CompletedTask",
    },
   
   
  ];
 

  return (
    <AgentContext.Provider
      value={{
        currentTab, 
        setCurrentTab,
        hideDurationNotifier,
        navigationArray,
        setHiderDurationNotifier,
        notifyMessage,
        setNotifyMessage,
        openNotifer,
        setOpenNotifier,
        showMiniNav,
        setShowMiniNav,
      }}
    >
       
       <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh', overflow: 'hidden' }} >
        <Navbar />
        <Box sx={{ height: '92vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }} >
          <Outlet />
        </Box>
      </Box>
      <Snackbar
        open={openNotifer}
        autoHideDuration={hideDurationNotifier}
        onClose={() => setOpenNotifier(!openNotifer)}
        message={notifyMessage}
        action={action}
      />
    </AgentContext.Provider>
  );
}
