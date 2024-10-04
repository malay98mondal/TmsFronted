import React, { createContext, useState, ReactNode } from 'react';

interface AuthContextType {
  superAdminToken: string | null;
  adminToken: string | null;
  userToken: string | null;
  agentToken: string | null;
  setSuperAdminToken: (token: string | null) => void;
  setAdminToken: (token: string | null) => void;
  setUserToken: (token: string | null) => void;
  setAgentToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  superAdminToken: null,
  adminToken: null,
  userToken: null,
  agentToken: null,
  setSuperAdminToken: () => {},
  setAdminToken: () => {},
  setUserToken: () => {},
  setAgentToken: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [superAdminToken, setSuperAdminToken] = useState<string | null>(localStorage.getItem('superAdminToken'));
  const [adminToken, setAdminToken] = useState<string | null>(localStorage.getItem('adminToken'));
  const [userToken, setUserToken] = useState<string | null>(localStorage.getItem('userToken'));
  const [agentToken, setAgentToken] = useState<string | null>(localStorage.getItem('agentToken'));

  const setTokenInStorage = (key: string, token: string | null) => {
    if (token) {
      localStorage.setItem(key, token);
      console.log(`Token set in localStorage for ${key}:`, token);
    } else {
      localStorage.removeItem(key);
      console.log(`Token removed from localStorage for ${key}`);
    }
  };

  const handleSetSuperAdminToken = (token: string | null) => {
    setSuperAdminToken(token);
    setTokenInStorage('superAdminToken', token);
  };

  const handleSetAdminToken = (token: string | null) => {
    setAdminToken(token);
    setTokenInStorage('adminToken', token);
  };

  const handleSetUserToken = (token: string | null) => {
    setUserToken(token);
    setTokenInStorage('userToken', token);
  };

  const handleSetAgentToken = (token: string | null) => {
    setAgentToken(token);
    setTokenInStorage('agentToken', token);
  };

  return (
    <AuthContext.Provider value={{ superAdminToken, adminToken, userToken, agentToken, setSuperAdminToken: handleSetSuperAdminToken, setAdminToken: handleSetAdminToken, setUserToken: handleSetUserToken, setAgentToken: handleSetAgentToken }}>
      {children}
    </AuthContext.Provider>
  );
};
