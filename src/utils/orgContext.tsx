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


const OrgContext = createContext<any | null>(null);

export default OrgContext;


export const useOrgContext = () => {
  const context = useContext(OrgContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};