import React, { ReactNode } from "react";
import { AuthProvider } from "./Auth";
import { PostsProvider } from "./Posts";
import { MeProvider } from "./Me";

interface APIProviderProps {
  children: ReactNode;
}

const APIProvider = ({ children }: APIProviderProps) => {
  return (
    <AuthProvider>
      <MeProvider>
        <PostsProvider>{children}</PostsProvider>
      </MeProvider>
    </AuthProvider>
  );
};

export default APIProvider;
