import React, { ReactNode } from "react";
import { PostsProvider } from "./Posts";
import { LayoutProvider } from "./Layout";
import { MeProvider } from "./Me";

interface APIProviderProps {
  children: ReactNode;
}

const APIProvider = ({ children }: APIProviderProps) => {
  return (
    <MeProvider>
      <LayoutProvider>
        <PostsProvider>{children}</PostsProvider>
      </LayoutProvider>
    </MeProvider>
  );
};

export default APIProvider;
