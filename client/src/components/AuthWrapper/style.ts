import styled from "styled-components";
import theme from "../../theme";
import { Link } from "react-router-dom";

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
