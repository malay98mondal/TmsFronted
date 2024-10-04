import React, { useContext } from "react";

import { createContext } from "react";

type Tab =  {
    id:number;
    name:string;
}


type ContextType = {
  currentTab: Tab | null;
  setCurrentTab: (tab: Tab) => void;
}


const AdminContext = createContext<any | null>(null);

export default AdminContext;


export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};