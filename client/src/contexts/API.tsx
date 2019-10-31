import React, { ReactNode } from "react";
import { AuthProvider } from "./Auth";
import { PostsProvider } from "./Posts";

interface APIProviderProps {
  children: ReactNode;
}

const APIProvider = ({ children }: APIProviderProps) => {
  return (
    <AuthProvider>
      <PostsProvider>{children}</PostsProvider>
    </AuthProvider>
  );
};

export default APIProvider;
