import React, { ReactNode } from "react";
import { PostsProvider } from "./Posts";

interface APIProviderProps {
  children: ReactNode;
}

const APIProvider = ({ children }: APIProviderProps) => {
  return <PostsProvider>{children}</PostsProvider>;
};

export default APIProvider;
