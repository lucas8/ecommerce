import styled from "styled-components";
import { Link } from "react-router-dom";
import { StyledThemeType } from "../theme";

export const NavBarLink = styled(Link)`
  font-size: 16px;
  color: ${({ theme }: StyledThemeType) => theme.text.secondary};
  margin-left: 35px;
  text-decoration: none;
  transition: all ease-in-out 150ms;
  padding: 6px;
  border-radius: 6px;
  outline: none;
  :hover {
    background: ${({ theme }: StyledThemeType) => theme.bg.border};
  }
`;
