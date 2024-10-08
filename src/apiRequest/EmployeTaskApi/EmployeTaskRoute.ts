// /src/api/taskDetailsAPI.ts
import axios from 'axios';

// Base URL for your backend API
const API_URL = 'http://localhost:5000/api/v1';  // Replace with your actual API URL

// Function to fetch tasks assigned to an employee by their ID
export const getTasksByAssignedEmployee = async (employeeId: number) => {
  try {
    const response = await axios.get(`${API_URL}/EmployeTaskRoute/assigned/${employeeId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};
