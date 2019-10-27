import styled from "styled-components";
import theme from "../../theme";
import { Link } from "react-router-dom";

export const LoginPageContainer = styled.div`
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

export const LoginFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  flex-direction: column;
  padding: 20px 50px;
`;

export const LoginGraphicContainer = styled.div`
  height: 100%;
  background: ${theme.bg.alt};
  border-radius: 0 10px 10px 0;

  @media only screen and (max-width: 51em) {
    display: none;
  }
`;

export const LoginRedirectWrapper = styled.span`
  font-weight: 15px;
  font-weight: bold;
  color: white;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SignupRedirectLink = styled(Link)`
  font-weight: 15px;
  font-weight: bold;
  color: ${theme.text.alt};
  text-decoration: none;
  align-self: flex-start;
`;
