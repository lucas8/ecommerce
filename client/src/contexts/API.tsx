import React, { ReactNode } from "react";
import { PostsProvider } from "./Posts";
import { LayoutProvider } from "./Layout";
import { MeProvider } from "./Me";
import { StripeProvider } from "react-stripe-elements";

interface APIProviderProps {
  children: ReactNode;
}

const APIProvider = ({ children }: APIProviderProps) => {
  return (
    <StripeProvider apiKey="pk_test_PGr2UcNmiHlX7VhEIsN6sqsT00KcPDHxJG">
      <MeProvider>
        <LayoutProvider>
          <PostsProvider>{children}</PostsProvider>
        </LayoutProvider>
      </MeProvider>
    </StripeProvider>
  );
};

export default APIProvider;
