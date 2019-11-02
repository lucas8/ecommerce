import React, { ReactNode } from "react";
import { PostsProvider } from "./Posts";
import { LayoutProvider } from "./Layout";

interface APIProviderProps {
  children: ReactNode;
}

const APIProvider = ({ children }: APIProviderProps) => {
  return (
    <LayoutProvider>
      <PostsProvider>{children}</PostsProvider>
    </LayoutProvider>
  );
};

export default APIProvider;
