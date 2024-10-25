// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { showWarningDialog } from './dialogService';
// import { jwtDecode } from 'jwt-decode';
// import { managerCookies, memberCookiers, teamLeadCookies } from '../apiRequest/ConfigData';

// // Function to check if a token is expired
// const isTokenExpired = (token: string): boolean => {
//   const decodedToken: { exp: number } = jwtDecode(token);
//   return decodedToken.exp * 1000 < Date.now(); // Check if token is expired
// };

// // Function to get the appropriate token based on the user's role
// const getTokenByRole = (role: string): string | null => {
//   switch (role) {
//     case 'manager':
//       return Cookies.get(managerCookies);
//     case 'teamLead':
//       return Cookies.get(teamLeadCookies);
//     case 'member':
//       return Cookies.get(memberCookiers);
//     default:
//       return null; // No valid role
//   }
// };

// // Middleware function to handle API calls and token expiration
// export const jwtMiddleware = async (role: string, apiCall: () => Promise<any>) => {
//   const token = getTokenByRole(role);

//   if (token && isTokenExpired(token)) {
//     // Show warning dialog if the token is expired
//     showWarningDialog('Your session has expired. Please log in again.');
//     return null; // Prevent the API call from proceeding
//   }

//   try {
//     // Proceed with the API call
//     const response = await apiCall();
//     return response; // Return the response if needed
//   } catch (error) {
//     throw error; // Handle error as needed
//   }
// };
