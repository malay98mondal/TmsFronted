// import React, { useEffect, useState } from "react";
// import PersonIcon from '@mui/icons-material/Person';

// import AdminContext from '../utils/adminContext'
// import { Box, Button, Grid, IconButton, Snackbar } from "@mui/material";

// import { Outlet } from "react-router-dom";
// import SideNav from "./sideNav";
// import userContext from "../utils/userContext";
// import Navbar from "../components/UserLogin/Navbar";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';
// import { faGraduationCap, faBriefcase } from '@fortawesome/free-solid-svg-icons';
// import StarIcon from '@mui/icons-material/Star';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import { faHospital } from '@fortawesome/free-solid-svg-icons';
// import { faAddressBook, faPhone } from '@fortawesome/free-solid-svg-icons';
// import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
// import WorkIcon from '@mui/icons-material/Work';
// import PeopleIcon from '@mui/icons-material/People';
// import InfoIcon from '@mui/icons-material/Info';
// import BadgeIcon from '@mui/icons-material/Badge';


// export default function OrganizationUserLayout(props: any) {
//   const { darkMode, setDarkMode } = props;

//   const [currentTab, setCurrentTab] = useState(1);
//   const [showMiniNav, setShowMiniNav] = useState(false);

//   const [openNotifer, setOpenNotifier] = useState(false);
//   const [notifyMessage, setNotifyMessage] = useState("");
//   const [hideDurationNotifier, setHiderDurationNotifier] = useState(50000000);

//   const action = (
//     <React.Fragment>
//       <IconButton
//         size="small"
//         aria-label="close"
//         color="inherit"
//         onClick={() => setOpenNotifier(!openNotifer)}
//       >
//         <Button>close</Button>
//       </IconButton>
//     </React.Fragment>
//   );

//   const navigationArray = [
//     // {
//     //   id: 1,
//     //   name: "dashboard",
//     //   path: "",
//     // },
//     // {
//     //   id: 2,
//     //   name: "Providers List",
//     //   path: "/user-dashboard/provider-table",
//     // },
//     {
//       id: 3,
//       name: "Personal Information",
//       path: "/user-dashboard/personalinfo",
//       icon: <FontAwesomeIcon icon={faUser} />
//     },
//     {
//       id: 4,
//       name: "Professional IDs",
//       path: "/user-dashboard/professional-ids",
//       icon: <BadgeIcon sx={{ width: '0.7em' }} />,
//     },
//     {
//       id: 5,
//       name: "Education & Professional Training",
//       path: "/user-dashboard/educational-Professional-trainings",
//       icon: <FontAwesomeIcon icon={faGraduationCap} />,
//     },
//     {
//       id: 6,
//       name: "Specialties",
//       path: "/user-dashboard/specialties",
//       icon: <StarIcon sx={{ width: '0.8em' }} />
//     },
//     {
//       id: 7,
//       name: "Practice Locations",
//       path: "/user-dashboard/practice-location-Main",
//       icon: <LocationOnIcon sx={{ width: '0.8em' }} />,
//     },
//     {
//       id: 8,
//       name: "Hospital Affiliations",
//       path: "/user-dashboard/hospital-affiliations",
//       icon: <FontAwesomeIcon icon={faHospital} size="sm" />,
//     },
//     {
//       id: 9,
//       name: "Credentialing Contacts",
//       path: "/user-dashboard/credentialing-contacts",
//       icon: <FontAwesomeIcon icon={faAddressBook} size="sm" />,
//     },
//     {
//       id: 10,
//       name: "Professional Liability Insurance",
//       path: "/user-dashboard/professional-liability-insurance",
//       path2: "/user-dashboard/insurance-coverage",
//       icon: <FontAwesomeIcon icon={faShieldAlt} />,
//     },
//     {
//       id: 11,
//       name: "Employment Information",
//       path: "/user-dashboard/employment-information",
//       icon: <WorkIcon sx={{ width: '0.7em' }} />,
//     },
//     {
//       id: 12,
//       name: "Professional References",
//       path: "/user-dashboard/professional-references",
//       icon: <PeopleIcon sx={{ width: '0.8em' }} />,
//     },
//     {
//       id: 13,
//       name: "Disclosure",
//       path: "/user-dashboard/disclosure",
//       icon: <InfoIcon sx={{ width: '0.8em' }} />,
//     },

//   ];

//   function removeDomains(url: any) {
//     const domainsToRemove = [
//       "http://localhost:3001",
//       "'http://localhost:5173'",
//     ];
//     for (const domain of domainsToRemove) {
//       if (url.startsWith(domain)) {
//         let result = url.substring(domain.length);
//         if (result.endsWith("/")) {
//           result = result.slice(0, -1);
//         }
//         return result;
//       }
//     }
//     return url;
//   }

//   useEffect(() => {
//     const url = window.location.href;

//     const path = removeDomains(url);

//     console.log(path);

//     const find: any = navigationArray?.find((x: any) =>
//       x?.path?.includes(path)
//     );

//     setCurrentTab(find?.id);
//   }, []);



//   return (
//     <userContext.Provider
//       value={{
//         currentTab,
//         setCurrentTab,
//         navigationArray,
//         hideDurationNotifier,
//         setHiderDurationNotifier,
//         notifyMessage,
//         setNotifyMessage,
//         openNotifer,
//         setOpenNotifier,
//         showMiniNav,
//         setShowMiniNav,
//       }}
//     >

//       {/* <Box sx={{display:'flex',flexDirection:'column',width:'100%',height:'100vh',overflow:'hidden'}}  >
//       <Navbar/>
//       <Grid container sx={{ height: "90vh", background: "#E0E5E5", overflow:'auto'}}>
//         <Outlet />
//       </Grid>
//       </Box> */}

//       <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh', overflow: 'hidden' }} >
//         <Navbar />
//         <Box sx={{ height: '92vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }} >
//           <Outlet />
//         </Box>
//       </Box>

//       <Snackbar
//         open={openNotifer}
//         autoHideDuration={hideDurationNotifier}
//         onClose={() => setOpenNotifier(!openNotifer)}
//         message={notifyMessage}
//         action={action}
//       />




//     </userContext.Provider>
//   );
// }
