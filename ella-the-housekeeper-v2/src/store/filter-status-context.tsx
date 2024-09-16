import React, { createContext, useContext, useState, ReactNode } from 'react';

interface StoreContextType {
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const FilterStoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState("In Progress");

  return (
    <StoreContext.Provider value={{ status, setStatus }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useFilterStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a FilterStoreProvider');
  }
  return context;
};