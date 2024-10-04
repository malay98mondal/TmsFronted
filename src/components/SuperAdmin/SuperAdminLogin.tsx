
import React, { useState, useContext } from 'react';
import '../../css/SuperAdminLoing.css';
import logo from '../../assets/logo.jpeg';
import { postAdminLogin } from '../../apiRequest/Auth';
import { AuthContext } from '../../Context/AuthContext';
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import { adminCookie } from '../../apiRequest/config';


const SuperAdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await postAdminLogin({ email, password });
      console.log('Login successful:', response);

      if (response?.access_token) {
        Cookies.set(adminCookie,response?.access_token)
        
        window.location.href='/super-admin-dashboard'
      }

     
     
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="sal-container">
      <div className="sal-form-container">
        <h2 className="sal-heading">Super Admin Login</h2>
        <form className="sal-login-form">
          <div className="sal-input-group">
            <label className="sal-label" htmlFor="email">Username</label>
            <input
              className="sal-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="sal-input-group">
            <label htmlFor="password">Password</label>
            <input
              className="sal-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className=" sal-login-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </form>
      </div>
      <div className="sal-image-container">
        <img className="sal-img" src={logo} alt="Sign In" />
      </div>
    </div>
  );
};

export default SuperAdminLogin;
 