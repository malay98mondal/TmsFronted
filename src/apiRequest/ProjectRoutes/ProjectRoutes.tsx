import axios from 'axios';
import Cookies from 'js-cookie';
import { managerCookies } from '../ConfigData';

const API_URL = 'http://localhost:5000/api/v1/GetProject/projects';  // Replace with your actual API URL

// Function to fetch projects from backend
export const fetchProjects = async () => {
    const token = Cookies.get(managerCookies);
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,  // Include the token in the request header
        },
      });
      return response.data;  // Assuming the data contains `success` and `data`
    } catch (error: any) {
      console.error("Failed to fetch projects", error);
      throw new Error(error.response?.data?.message || 'Error fetching projects');
    }
  };



const BASE_URL = 'http://localhost:5000/api/v1/';

export const getProjectEmployees = async (projectId: number) => {
    const token = Cookies.get(managerCookies);
    try {
      const response = await axios.get(
        `${BASE_URL}/ProjectEmployee/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Include the token in the request header
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error fetching project employees');
    }
  };

  export const getEmployees = async () => {
    const token = Cookies.get(managerCookies);

    try {
      const response = await axios.get(
        `${BASE_URL}/Employee/GetEmployee`,
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
          },
        }
      );
      return response.data;
    } catch (error: any) {
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



export const addEmployee = async (employeeData: { Employee_name: string,email:string,password:string }) => {
    const token = Cookies.get(managerCookies);
    try {
      const response = await axios.post(
        `${BASE_URL}/Employee/post`, 
        employeeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create employee');
    }
  };

  export const addProject = async (projectData: { Project_Name: string; Status: string }) => {
    const token = Cookies.get(managerCookies);

    try {
      const response = await axios.post(
        `${BASE_URL}/GetProject/addProject`,
        projectData,
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Include the token in the request header
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("Error adding project:", error);
      throw new Error(error.response?.data?.message || 'Error adding project');
    }
  };