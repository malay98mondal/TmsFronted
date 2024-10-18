import axios from 'axios';
import Cookies from 'js-cookie';
import { API_URL, managerCookies } from '../ConfigData';


// Function to fetch projects from backend
export const fetchProjects = async (page: number, pageSize: number, search: string) => {
  const token = Cookies.get(managerCookies);
  
  try {
    const response = await axios.get(`${API_URL}/GetProject/projects`, {
      headers: {
        Authorization: `Bearer ${token}`,  // Include the token in the request header
      },
      params: {
        page,          // Pass the page number as a query parameter
        pageSize,      // Pass the page size (number of items per page) as a query parameter
        search,        // Pass the search term as a query parameter
      },
    });
    return response.data;  // Assuming the data contains `success` and `data`
  } catch (error: any) {
    console.error("Failed to fetch projects", error);
    throw new Error(error.response?.data?.message || 'Error fetching projects');
  }
};





export const getProjectEmployees = async (
  projectId: number,
  page: number ,      
  pageSize: number ,  
  search: string     
) => {
  const token = Cookies.get(managerCookies);
  
  try {
    const response = await axios.get(
      `${API_URL}/ProjectEmployee/${projectId}`, 
      {
        headers: {
          Authorization: `Bearer ${token}`,  // Include the token in the request header
        },
        params: {                        // Add query parameters
          page,                         // Current page
          pageSize,                    // Number of records per page
          search,                      // Search term
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error fetching project employees');
  }
};


  export const getEmployees1 = async (page: number, limit: number, search: string) => {
    const token = Cookies.get(managerCookies);

    try {
      const response = await axios.get(
        `${API_URL}/Employee/GetEmployee1?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`, // Add query parameters
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
          },
        }
      );
      return response.data; // Ensure this returns the data you expect (employee list, total pages, etc.)
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error fetching employees');
    }
};

export const getEmployees = async () => {
  const token = Cookies.get(managerCookies);

  try {
    const response = await axios.get(
      `${API_URL}/Employee/GetEmployee`,
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
export const addOrUpdateProjectEmployee = async (projectId: number, empId: number, roleId: number, Degesination: string) => {

    try {
        const response = await axios.post(`${API_URL}/ProjectEmployee/${projectId}`, {
            Emp_Id: empId,
            Role_Id: roleId,
            Degesination:Degesination
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
        `${API_URL}/Employee/post`, 
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
        `${API_URL}/GetProject/addProject`,
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