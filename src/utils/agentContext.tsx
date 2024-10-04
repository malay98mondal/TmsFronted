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


const AgentContext = createContext<any | null>(null);

export default AgentContext;


export const useAgentContext = () => {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};