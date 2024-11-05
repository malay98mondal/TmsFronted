import axios from 'axios';
import Cookies from 'js-cookie';
import { API_URL, managerCookies } from '../ConfigData';


// Function to fetch projects from backend
export const fetchProjects = async (  showWarningDialog: (msg: string) => void
,page: number, pageSize: number, search: string) => {
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
    const status = error.response?.status;

    if (status === 401) {
      showWarningDialog("Your session has expired. Please log in again.");
    } 
    throw new Error(error.response?.data?.message || 'Error updating task');
  }
};





export const getProjectEmployees = async (
  projectId: number,
  page: number ,      
  pageSize: number ,  
  search: string  ,
  showWarningDialog: (msg: string) => void   
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
    const status = error.response?.status;

    if (status === 401) {
      showWarningDialog("Your session has expired. Please log in again.");
    } 
    throw new Error(error.response?.data?.message || 'Error updating task');
  }
};


  export const getEmployees1 = async (  showWarningDialog: (msg: string) => void
,  page: number, limit: number, search: string) => {
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
      const status = error.response?.status;
  
      if (status === 401) {
        showWarningDialog("Your session has expired. Please log in again.");
      } 
      throw new Error(error.response?.data?.message || 'Error updating task');
    }
  };

export const getEmployees = async (  showWarningDialog: (msg: string) => void
,page: number = 1, searchTerm: string = ''): Promise<any> => {
  const token = Cookies.get(managerCookies);

  try {
    const response = await axios.get(
      `${API_URL}/Employee/GetEmployee`,
      {
        headers: {
          Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
        },
        params: {
          page,          // Add the page parameter
          searchTerm,    // Add the searchTerm parameter
        },
      }
    );
    return response.data;
  } catch (error: any) {
    const status = error.response?.status;

    if (status === 401) {
      showWarningDialog("Your session has expired. Please log in again.");
    }
    throw new Error(error.response?.data?.message || 'Error updating task');
  }
};





// Function to add or update project employee
export const addOrUpdateProjectEmployee = async (  showWarningDialog: (msg: string) => void ,projectId: number, empId: number, roleId: number, Degesination: string) => {

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
      const status = error.response?.status;
  
      if (status === 401) {
        showWarningDialog("Your session has expired. Please log in again.");
      } 
  
      throw new Error(error.response?.data?.message || 'Error updating task');
    }
  };




export const patchProjectEmployee = async (
  showWarningDialog: (msg: string) => void,
  projectId: number,
  projectMemberId: number,
  data: {
    Emp_Id: number;
    Role_Id: number;
    Degesination: string;
 }
) => {
  try {
    const token = Cookies.get(managerCookies);

    const response = await axios.patch(
      `${API_URL}/ProjectEmployee/${projectId}/${projectMemberId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
        },
      }
    );
    return response.data;
  } catch (error: any) {
    const status = error.response?.status;

    if (status === 401) {
      showWarningDialog("Your session has expired. Please log in again.");
    } 
    throw new Error(error.response?.data?.message || 'Error updating task');
  }
};



export const addEmployee = async (  showWarningDialog: (msg: string) => void
,employeeData: { Employee_name: string,email:string,password:string }) => {
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
      const status = error.response?.status;
  
      if (status === 401) {
        showWarningDialog("Your session has expired. Please log in again.");
      }
  
      throw new Error(error.response?.data?.message || 'Error updating member');
    }
  };

  export const addProject = async (  showWarningDialog: (msg: string) => void,
  projectData: { Project_Name: string; Status: string }) => {
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
      const status = error.response?.status;
  
      if (status === 401) {
        showWarningDialog("Your session has expired. Please log in again.");
      } 
  
      throw new Error(error.response?.data?.message || 'Error adding task');
    }
  };
