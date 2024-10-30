import axios from 'axios';
import Cookies from 'js-cookie';
import { API_URL, managerCookies, memberCookiers, teamLeadCookies } from '../ConfigData';



export const getTasksByEmployeeId = async (search: string, page: number, limit: number, showWarningDialog: (msg: string) => void) => {
  const token = Cookies.get(teamLeadCookies);
  try {
    const response = await axios.get(`${API_URL}/TaskRoutes/tasks`, {
      params: {
        search,
        page,
        limit,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return your data
  } catch (error) {
    const status = error.response?.status;
    if (status === 401) {
      showWarningDialog("Your session has expired. Please log in again.");
    } else {
      showWarningDialog("An error occurred while fetching tasks.");
    }
    throw error; // Rethrow the error to be handled by the caller
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

export const getProjectEmployees = async (projectId: number, search: string = '', limit: number = 10, offset: number = 0) => {
  const token = Cookies.get(teamLeadCookies);

  try {
    const response = await axios.get(`${API_URL}/TaskRoutes/project-employees/${projectId}/exclude`, {
      headers: {
        Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
      },
      params: {
        search,  // Add search term as a query parameter
        limit,   // Add limit as a query parameter
        offset,  // Add offset for pagination as a query parameter
      }
    });
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error fetching project employees:", error);
    throw error; // Rethrow the error for further handling
  }
};


export const importTasks = async (projectId: string, file: File) => {
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


export const updateTask = async (taskId: number, status: string, remarks: string, Actual_Start_Date: any, Actual_Start_Time: any) => {
  const token = Cookies.get(memberCookiers);  // Retrieve the token from the cookie

  try {
    const response = await axios.put(`${API_URL}/EmployeTaskRoute/UpdateTask/${taskId}`, {
      Status: status,
      Remarks: remarks,
      Actual_Start_Date: Actual_Start_Date,
      Actual_Start_Time: Actual_Start_Time,
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

export const updateTaskTeamLead = async (taskId: string, taskData: any) => {
  const token = Cookies.get(teamLeadCookies);  // Retrieve the token from the cookie

  try {
    const response = await axios.patch(`${API_URL}/TaskRoutes/UpdateTask/${taskId}`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`, // Assuming token is required for authorization
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message || 'Error updating task');
  }
};


export const getTeamLeadTask = async (
  page: number,
  limit: number,
  search: string,
  showWarningDialog: (msg: string) => void
) => {
  const token = Cookies.get(teamLeadCookies);
  const url = `${API_URL}/TaskRoutes/assigned?page=${page}&limit=${limit}&search=${search}`;
  console.log(`Fetching tasks from: ${url}`);

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
      },
    });
    return response.data;
  } catch (error: any) {
    const status = error.response?.status;

    if (status === 401) {
      showWarningDialog("Your session has expired. Please log in again.");
    } else {
      showWarningDialog("An error occurred while fetching tasks.");
    }

    throw error.response?.data || 'Error fetching tasks';
  }
};


export const editTeamLeadOwnTask = async (
  taskId: number,
  status: string,
  remarks: string,
  Actual_Start_Date: any,
  Actual_Start_Time: any,
  showWarningDialog: (msg: string) => void
) => {
  const token = Cookies.get(teamLeadCookies);

  try {
    const response = await axios.put(`${API_URL}/TaskRoutes/UpdateTask/${taskId}`, {
      Status: status,
      Remarks: remarks,
      Actual_Start_Date: Actual_Start_Date,
      Actual_Start_Time: Actual_Start_Time,
    },
      {
        headers: {
          Authorization: `Bearer ${token}`,  // Send the token in the Authorization header
        },
      });

    return response.data;
  } catch (error: any) {
    const status = error.response?.status;

    if (status === 401) {
      showWarningDialog("Your session has expired. Please log in again.");
    } 
    throw new Error(error.response?.data?.message || 'Error updating task');
  }
};
