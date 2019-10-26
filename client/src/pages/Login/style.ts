import styled from "styled-components";
import theme from "../../theme";
import { Link } from "react-router-dom";

export const LoginPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const LoginFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
  padding: 0 50px;
`;

export const LoginGraphicContainer = styled.div`
  width: 400vh;
  height: 100%;
  background: ${theme.bg.alt};
  border-radius: 0 10px 10px 0;
`;

export const LoginRedirectWrapper = styled.span`
  font-weight: 15px;
  font-weight: bold;
  color: white;
  margin-top: 30px;
`;

export const SignupRedirectLink = styled(Link)`
  font-weight: 15px;
  font-weight: bold;
  color: ${theme.text.alt};
  text-decoration: none;
`;
