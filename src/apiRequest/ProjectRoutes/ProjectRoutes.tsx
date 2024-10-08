import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/GetProject/projects';  // Replace with your actual API URL

// Function to fetch projects from backend
export const fetchProjects = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;  // Assuming the data contains `success` and `data`
  } catch (error: any) {
    console.error("Failed to fetch projects", error);
    throw error;  // You can handle error logging or user feedback here
  }
};




const BASE_URL = 'http://localhost:5000/api/v1/';

export const getProjectEmployees = async (projectId: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/ProjectEmployee/${projectId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching project employees');
    }
};

export const getEmployees = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/Employee/GetEmployee`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching employees');
    }
};





// Function to add or update project employee
export const addOrUpdateProjectEmployee = async (projectId: number, empId: number, roleId: number) => {
    try {
        const response = await axios.post(`${BASE_URL}/ProjectEmployee/${projectId}`, {
            Emp_Id: empId,
            Role_Id: roleId,
        }, {
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers if needed (e.g., authorization)
            },
        });
        return response.data; // Return the response data
    } catch (error: any) {
        // Instead of creating a new Error, just rethrow the original error for better handling
        if (error.response) {
            throw error.response; // Pass the response object if available
        } else {
            throw new Error('Failed to add or update project employee');
        }
    }
};
