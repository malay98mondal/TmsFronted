import axios from 'axios';


const API_URL = 'http://localhost:5000/api/v1';  // Replace with your actual API URL

export const getTasksByEmployeeId = async (empId: number) => {
    try {
      const response = await axios.get(`${API_URL}/TaskRoutes/tasks/${empId}`, {
      });
      return response.data; // This will return { ProjectName, Tasks }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error; // You can throw the error to handle it in your component
    }
  };


  export const createTask = async (taskData) => {
    try {
        const response = await axios.post(`${API_URL}/TaskRoutes/CreateTask`, taskData);
        return response.data;
    } catch (error) {
        throw error.response.data; // Handle error appropriately
    }
};


export const getProjectEmployees = async (projectId: number, employeeId: number) => {
    try {
      const response = await axios.get(`${API_URL}/TaskRoutes/project-employees/${projectId}/exclude/${employeeId}`);
      return response.data; // Return the data from the response
    } catch (error) {
      console.error("Error fetching project employees:", error);
      throw error; // Rethrow the error for further handling
    }
  };