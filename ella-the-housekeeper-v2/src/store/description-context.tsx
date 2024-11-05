"use client";

import type React from "react";
import { createContext, useContext, useState, type ReactNode } from "react";

interface StoreContextType {
  showDescription: number | undefined;
  setShowDescription: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const DescriptionStoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [showDescription, setShowDescription] = useState<number | undefined>(
    undefined
  );

  return (
    <StoreContext.Provider value={{ showDescription, setShowDescription }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useDescriptionStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error(
      "useDescriptionStore must be used within a DescriptionStoreProvider"
    );
  }
  return context;
};
