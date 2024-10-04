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


const ProviderContext = createContext<any | null>(null);

export default ProviderContext;


export const useProviderContext = () => {
  const context = useContext(ProviderContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};