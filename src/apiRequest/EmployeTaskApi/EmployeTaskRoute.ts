// /src/api/taskDetailsAPI.ts
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_URL, memberCookiers } from '../ConfigData';


// Function to fetch tasks assigned to an employee by their ID
// export const getTasksByAssignedEmployee = async (employeeId: number, page: number, limit: number, search: string) => {
//   try {
//     const response = await axios.get(`${API_URL}/EmployeTaskRoute/assigned/${employeeId}`, {
//       params: {
//         page,   // Current page number
//         limit,  // Number of items per page
//         search, // Search term
//       },
//     });
//     return response.data; // Assuming your API returns { total, tasks }
//   } catch (error) {
//     console.error("Error fetching tasks:", error);
//     throw error;
//   }
// };

export const getTasksByAssignedEmployee = async ( page: number, limit: number, search: string) => {
  const token = Cookies.get(memberCookiers);
  const url = `${API_URL}/EmployeTaskRoute/assigned?page=${page}&limit=${limit}&search=${search}`;
  console.log(`Fetching tasks from: ${url}`); // Log the URL

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching tasks:", error);
    throw error.response?.data || 'Error fetching tasks';  // Handle error appropriately
  }
};


// export const getTasksByAssignedEmployeeCompleted = async (empId, page, limit, search) => {
//   const url = `${API_URL}/EmployeTaskRoute/CompletedTask/${empId}?page=${page}&limit=${limit}&search=${search}`;
//   console.log(`Fetching tasks from: ${url}`); // Log the URL
//   const response = await axios.get(url);
//   return response.data;
// };

// Function to fetch tasks assigned to an employee by their ID
export const getTasksByAssignedEmployeeCompleted = async ( page: number, limit: number, search: string) => {
  const token = Cookies.get(memberCookiers);
  try {
    const response = await axios.get(`${API_URL}/EmployeTaskRoute/CompletedTask`, {
      params: {
        page,   // Current page number
        limit,  // Number of items per page
        search, // Search term
      },
      headers: {
        Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
      },
    });
    return response.data; // Assuming your API returns { total, tasks }
  } catch (error: any) {
    console.error("Error fetching tasks:", error);
    throw error.response?.data || 'Error fetching completed tasks';  // Handle error appropriately
  }
};


export const postEmployee = async (employeeData: { Employee_name: string }) => {
  try {
    const response = await axios.post(`${API_URL}/Employee/post`, employeeData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create employee');
  }
};