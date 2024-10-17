import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1'; 


export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data; // This will return the access token and user type
};