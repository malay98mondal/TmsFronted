import axios from 'axios';
import Cookies from 'js-cookie';
import { managerCookies, memberCookiers, teamLeadCookies } from '../ConfigData';


const API_URL = 'http://localhost:5000/api/v1';  // Replace with your actual API URL

export const getTasksByEmployeeId = async (search: string, page: number, limit: number) => {
  const token = Cookies.get(teamLeadCookies);
  try {
    const response = await axios.get(`${API_URL}/TaskRoutes/tasks`, {
      params: {
        search,  // Include the search term
        page,    // Include the current page
        limit    // Include the number of tasks per page
      },
      headers: {
        Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
      },
    });
    return response.data; // This will return { ProjectName, Tasks }
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error; // You can throw the error to handle it in your component
  }
};


export const createTask = async (taskData: any) => {
  const token = Cookies.get(teamLeadCookies);
  try {
      const response = await axios.post(`${API_URL}/TaskRoutes/CreateTask`, taskData, {
          headers: {
              Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
          },
      });
      return response.data;
  } catch (error: any) {
      throw error.response?.data || 'Error creating task'; // Handle error appropriately
  }
};

export const getProjectEmployees = async (projectId: number) => {
  const token = Cookies.get(teamLeadCookies);

  try {
    const response = await axios.get(`${API_URL}/TaskRoutes/project-employees/${projectId}/exclude`, {
      headers: {
        Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
      },
    });
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error fetching project employees:", error);
    throw error; // Rethrow the error for further handling
  }
};

  export const importTasks = async ( projectId: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const token = Cookies.get(teamLeadCookies);
    try { 
      const response = await axios.post(`${API_URL}/TaskRoutes/importTasks/${projectId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Return the response data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error importing tasks'); // Handle errors
    }
  };


  export const getTaskDetailsById = async (taskId: number) => {
    const token = Cookies.get(teamLeadCookies);
    try {
        const response = await axios.get(`${API_URL}/TaskRoutes/task-details/${taskId}`, {
            headers: {
                Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
            },
        });
        return response.data;
    } catch (error: any) {
        console.error("Error fetching task details:", error);
        throw error.response?.data || 'Error fetching task details';  // Handle error appropriately
    }
};


  export const updateTask = async (taskId: number, status: string, remarks: string) => {
    const token = Cookies.get(memberCookiers);  // Retrieve the token from the cookie

    try {
        const response = await axios.put(`${API_URL}/EmployeTaskRoute/UpdateTask/${taskId}`, {
            Status: status,
            Remarks: remarks,
        }, 
        {
            headers: {
                Authorization: `Bearer ${token}`,  // Send the token in the Authorization header
            },
        });

        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error updating task');
    }
};