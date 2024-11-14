import axios from 'axios';
import Cookies from 'js-cookie';
import { API_URL, managerCookies } from '../ConfigData';





export const deleteProjectEmployee = async (  showWarningDialog: (msg: string) => void
,projectId: number, empId: number) => {
  const token = Cookies.get(managerCookies);
  
  try {
    const response = await axios.delete(`${API_URL}/projectEmployeeDelete/projectEmployee/${projectId}/${empId}`, {
      headers: {
        Authorization: `Bearer ${token}`,  // Include the token in the request header
      }
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


export const deleteProject = async (  showWarningDialog: (msg: string) => void
,projectId: number) => {
  const token = Cookies.get(managerCookies);
  
  try {
    const response = await axios.delete(`${API_URL}/projectDelete/projects/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,  
      }
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


export const deleteEmployee = async (  showWarningDialog: (msg: string) => void
,Emp_Id: number) => {
  const token = Cookies.get(managerCookies);
  
  try {
    const response = await axios.delete(`${API_URL}/employeeDelete/delete-employee/${Emp_Id}`, {
      headers: {
        Authorization: `Bearer ${token}`,  
      }
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
