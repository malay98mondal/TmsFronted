import { Box, Grid } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { useProviderContext } from "../utils/providerContext"
import ProviderSideNav from "./sideNavProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import BadgeIcon from '@mui/icons-material/Badge';
import { faGraduationCap, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { faHospital } from '@fortawesome/free-solid-svg-icons';
import { faAddressBook, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import InfoIcon from '@mui/icons-material/Info';

export default function DataRenderLayoutProvider({ children }:any) {


  const   navigationArrayProvider = [
    // {
    //   id: 1,
    //   name: "dashboard",
    //   path: "",
    // },
    // {
    //   id: 2,
    //   name: "Providers List",
    //   path: "/user-dashboard/provider-table",
    // },
    {
      id: 3,
      name: "Personal Info",
      path: "/provider-dashboard/PersonalInformation",
      icon: <FontAwesomeIcon icon={faUser}/>
      
    },
    {
      id: 4,
      name: "Professional IDs",
      path: "/provider-dashboard/ProfessionalIdForm",
      icon: <BadgeIcon sx={{width:'0.7em'}} />
    },
    {
      id: 5,
      name: "Education & Professional Training",
      path: "/provider-dashboard/EducationalProfessionalId",
      icon: <FontAwesomeIcon icon={faGraduationCap} />
    },
    {
      id: 6,
      name: "Specialties",
      path: "/provider-dashboard/Specialities",
      icon: <StarIcon sx={{width:'0.8em'}}/>
    },
    {
      id: 7,
      name: "Practice Locations",
      path: "/provider-dashboard/practice-location-Main-provider",
      icon: <LocationOnIcon sx={{width:'0.8em'}}/>
    },
    {
      id: 8,
      name: "Hospital Affiliations",
      path: "/provider-dashboard/HospitalAffilications",
      icon: <FontAwesomeIcon icon={faHospital}  size="sm" />,
    },
    {
      id: 9,
      name: "Credentialing Contacts",
      path: "/provider-dashboard/CredentialingContact",
      icon: <FontAwesomeIcon icon={faAddressBook} size="sm"  /> ,
    },
    {
      id: 10,
      name: "Professional Liability Insurance",
      path: "/provider-dashboard/ProfessionalLiabilityInsurances",
      icon: <FontAwesomeIcon icon={faShieldAlt} />,
    },
    {
      id: 11,
      name: "Employment Information",
      path: "/provider-dashboard/EmploymentInformation",
      icon: <WorkIcon sx={{width:'0.7em'}}/>,
    },
    {
      id: 12,
      name: "Professional References",
      path: "/provider-dashboard/Professionalreferences",
      icon: <PeopleIcon sx={{width:'0.8em'}}/> ,
    },
    {
      id: 13,
      name: "Discloure",
      path: "/provider-dashboard/DisclouserForm",
      icon: <InfoIcon sx={{width:'0.8em'}}/>,
    },
   
  ];
   
    const {darkMode,activeTab, setActiveTab,showMiniNav,setShowMiniNav} = useProviderContext()

   

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
        <Grid ref={containerRef} item xs={12} md={12} lg={12} sx={{ overflow:"auto",background: darkMode ? "#010101" :"#fff"}}  >

            <Grid container sx={{height: '92vh', background: darkMode ? "#010101" : "#fff",overflow:"hidden" }}>
              <Grid item xs={0} md={0} lg={2.5} sx={{display: { xs: "none", lg: "block" }, height: '92vh', overflow: 'auto'}} >
              <ProviderSideNav darkMode={darkMode} activeTab={activeTab} setActiveTab={setActiveTab} routes={navigationArrayProvider} showMiniNav={showMiniNav} setShowMiniNav={setShowMiniNav}  />
              </Grid>

              <Grid item xs={12} md={12} lg={9.5} sx={{ ml: { lg: "auto" }, overflowY: "auto", height: "92vh" }} ref={containerRef}>
                {children}
            </Grid>
            </Grid>

           

        </Grid>
    )

}