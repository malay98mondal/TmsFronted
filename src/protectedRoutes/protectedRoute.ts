import Cookies from 'js-cookie'

import { jwtDecode } from "jwt-decode";
import { adminCookie,provider,userCookie,agent, org } from '../apiRequest/config';





export const protectedRouter = () => {

    let cookie:string | undefined  = ""
    let role:string | undefined = ""

    if (Cookies.get(adminCookie)) {

        cookie = Cookies.get(adminCookie)
        role = "admin"
    }
    else if (Cookies.get(org)) {
        cookie = Cookies.get(org)
        role = "org"
    }
    else if (Cookies.get(userCookie)) {
        cookie = Cookies.get(userCookie)
        role = "user"
    }
    else if (Cookies.get(agent)) {
        cookie = Cookies.get(agent)
        role = "agent"
    }
    else if (Cookies.get(provider)) {
        cookie = Cookies.get(provider)
        role = "provider"
    }

  

    if (cookie) {
        const decodedToken: any = jwtDecode(cookie);
        const currentTime = Date.now() / 1000;
  
        // Check if the token has expired
        if (decodedToken.exp < currentTime) {
          // Token has expired, clear user data
          
          if (role == "admin") {
              Cookies.remove(adminCookie)
          }
          else if (role == 'org') {
            Cookies.remove(org)
            
        }
        else if (role == "user") {
            Cookies.remove(userCookie)
        }
        else if (role == "agent") {
            Cookies.remove(agent)
        }
        else if (role == "provider") {
            Cookies.remove(provider)
            
        }
        
          return false
          
         
        } else {
            console.log(role);
            return role

            
            
        }
      }


}









   