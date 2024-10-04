import React, { useEffect, useState } from "react";

import { Box, Button, Grid, IconButton, Snackbar } from "@mui/material";

import { Outlet } from "react-router-dom";
import Navbar from "../components/ProviderDetails/Navbar";
import ProviderContext from "../utils/providerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';
export default function OrganizationProviderLayout(props: any) {
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

  const navigationArrayProvider = [
    {
      id: 3,
      name: "Personal Info",
      path: "/provider-dashboard/PersonalInformation",
      icon: <FontAwesomeIcon icon={faUser} />
    },
    {
      id: 4,
      name: "Professional form",
      path: "/provider-dashboard/ProfessionalIdForm",
    },
    {
      id: 5,
      name: "Education & Professional Training",
      path: "/provider-dashboard/EducationalProfessionalId",
    },
    {
      id: 6,
      name: "Specialties",
      path: "/provider-dashboard/Specialities",
    },
    {
      id: 7,
      name: "Practice Locations",
      path: "/provider-dashboard/practice-location-Main-provider",
    },
    {
      id: 8,
      name: "Hospital Affiliations",
      path: "/provider-dashboard/HospitalAffilications",
    },
    {
      id: 9,
      name: "Credentialing Contacts",
      path: "/provider-dashboard/CredentialingContact",
    },
    {
      id: 10,
      name: "Professional Liability Insurance",
      path: "/provider-dashboard/ProfessionalLiabilityInsurances",
    },
    {
      id: 11,
      name: "Employment Information",
      path: "/provider-dashboard/EmploymentInformation",
    },
    {
      id: 12,
      name: "Professional References",
      path: "/provider-dashboard/Professionalreferences",
    },
    {
      id: 13,
      name: "Discloure",
      path: "/provider-dashboard/DisclouserForm",
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

    const find: any = navigationArrayProvider?.find((x: any) =>
      x?.path?.includes(path)
    );

    setCurrentTab(find?.id);
  }, []);



  return (
    <ProviderContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        navigationArrayProvider,
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
        <Box sx={{ height: "92vh", display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
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
    </ProviderContext.Provider>
  );
}
