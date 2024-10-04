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
