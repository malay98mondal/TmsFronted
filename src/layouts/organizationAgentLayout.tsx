import React, { useEffect, useState } from "react";
import { Box, Button, Grid, IconButton, Snackbar } from "@mui/material";

import { Outlet } from "react-router-dom";
import AgentContext from "../utils/agentContext";
import Navbar from "../components/agent/Navbar";

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

    // const find: any = navigationArray?.find((x: any) =>
    //   x?.path?.includes(path)
    // );

    // setCurrentTab(find?.id);
  }, []);

 

  return (
    <AgentContext.Provider
      value={{
        currentTab, 
        setCurrentTab,
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
