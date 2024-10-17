import Cookies from 'js-cookie'

import { jwtDecode } from "jwt-decode";
import { managerCookies, memberCookiers, teamLeadCookies } from '../apiRequest/ConfigData';





export const protectedRouter = () => {

    let cookie:string | undefined  = ""
    let role:string | undefined = ""

    if (Cookies.get(managerCookies)) {

        cookie = Cookies.get(managerCookies)
        role = "manager"
    }
    else if (Cookies.get(teamLeadCookies)) {
        cookie = Cookies.get(teamLeadCookies)
        role = "teamlead"
    }
    else if (Cookies.get(memberCookiers)) {
        cookie = Cookies.get(memberCookiers)
        role = "member"
    }
   

  

    if (cookie) {
        const decodedToken: any = jwtDecode(cookie);
        const currentTime = Date.now() / 1000;
  
        // Check if the token has expired
        if (decodedToken.exp < currentTime) {
          // Token has expired, clear user data
          
          if (role == "manager") {
              Cookies.remove(managerCookies)
          }
          else if (role == 'teamlead') {
            Cookies.remove(teamLeadCookies)
            
        }
        else if (role == "member") {
            Cookies.remove(memberCookiers)
        }
        
          return false
          
         
        } else {
            console.log(role);
            return role

            
            
        }
      }


}









   