import axios from 'axios';
import { API_URL } from '../ConfigData';


export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data; // This will return the access token and user type
};