import React, { ReactNode } from "react";
import styled from "styled-components";
import theme from "../../theme";
import { PageHeader, PageDescription } from "../Text";
import { LoginRedirectWrapper, SignupRedirectLink } from "./style";

const LoginPageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-template-rows: 1fr;

  @media only screen and (max-width: 51em) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }
`;

const LoginFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  flex-direction: column;
  padding: 20px 50px;
  text-align: left;
`;

const LoginGraphicContainer = styled.div`
  height: 100%;
  background: ${theme.bg.alt};
  border-radius: 0 10px 10px 0;

  @media only screen and (max-width: 51em) {
    display: none;
  }
`;

interface Props {
  children: ReactNode;
  title: string;
  description?: string;
  hasFooter?: boolean;
}

const AuthWrapper = ({
  children,
  title,
  description,
  hasFooter = false
}: Props) => {
  return (
    <LoginPageContainer>
      <LoginGraphicContainer />
      <LoginFormContainer>
        <div style={{ width: "100%" }}>
          <PageHeader>{title}</PageHeader>
          {description && (
            <PageDescription style={{ marginTop: 20 }}>
              {description}
            </PageDescription>
          )}
        </div>
        {children}
        {hasFooter && (
          <LoginRedirectWrapper>
            <span>
              Don't have an account?{" "}
              <SignupRedirectLink to="/user/signup">
                Sign up.
              </SignupRedirectLink>
            </span>
            <SignupRedirectLink to="/user/forgot">
              Forgot password?
            </SignupRedirectLink>
          </LoginRedirectWrapper>
        )}
      </LoginFormContainer>
    </LoginPageContainer>
  );
};

export default AuthWrapper;
