import type React from "react";
import { createContext, useContext, useState, type ReactNode } from "react";

interface StoreContextType {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const QRCodeStoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [url, setUrl] = useState("No Qr code read");

  return (
    <StoreContext.Provider value={{ url, setUrl }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useQRCodeStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a QRCodeStoreProvider");
  }
  return context;
};
