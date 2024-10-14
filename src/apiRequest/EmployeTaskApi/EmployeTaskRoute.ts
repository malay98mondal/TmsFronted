// /src/api/taskDetailsAPI.ts
import axios from 'axios';

// Base URL for your backend API
const API_URL = 'http://localhost:5000/api/v1';  // Replace with your actual API URL

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

export const getTasksByAssignedEmployee = async (empId, page, limit, search) => {
  const url = `${API_URL}/EmployeTaskRoute/assigned/${empId}?page=${page}&limit=${limit}&search=${search}`;
  console.log(`Fetching tasks from: ${url}`); // Log the URL
  const response = await axios.get(url);
  return response.data;
};



// export const getTasksByAssignedEmployeeCompleted = async (empId, page, limit, search) => {
//   const url = `${API_URL}/EmployeTaskRoute/CompletedTask/${empId}?page=${page}&limit=${limit}&search=${search}`;
//   console.log(`Fetching tasks from: ${url}`); // Log the URL
//   const response = await axios.get(url);
//   return response.data;
// };

// Function to fetch tasks assigned to an employee by their ID
export const getTasksByAssignedEmployeeCompleted = async (employeeId: number, page: number, limit: number, search: string) => {
  try {
    const response = await axios.get(`${API_URL}/EmployeTaskRoute/CompletedTask/${employeeId}`, {
      params: {
        page,   // Current page number
        limit,  // Number of items per page
        search, // Search term
      },
    });
    return response.data; // Assuming your API returns { total, tasks }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};