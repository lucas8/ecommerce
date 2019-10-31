import React, { ReactNode } from "react";
import { AuthProvider } from "./Auth";

interface APIProviderProps {
  children: ReactNode;
}

const APIProvider = ({ children }: APIProviderProps) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default APIProvider;
